<template>
  <div class="near-me-view">
    <header class="header animate-fade">
      <h1 class="gradient-text">Near Me</h1>
      <p class="subtitle">Finding locations within 5km of your position.</p>
    </header>

    <div class="map-simulation glass animate-fade" style="animation-delay: 0.1s">
      <div class="user-marker">
        <div class="pulse"></div>
        <MapPinIcon :size="24" />
      </div>
      <div 
        v-for="spot in store.allSpots" 
        :key="spot.id" 
        class="spot-marker"
        :style="getMarkerStyle(spot)"
        :class="{ 'in-range': spot.distance <= 5 }"
      ></div>
      <div class="radar"></div>
    </div>

    <section class="section animate-fade" style="animation-delay: 0.2s">
      <div class="section-header">
        <h2>Recommended Nearby</h2>
        <div class="toggle-container" @click="store.toggleNearMe">
          <span :class="{ active: store.nearMeEnabled }">Filter 5km</span>
          <div class="switch" :class="{ on: store.nearMeEnabled }"></div>
        </div>
      </div>
      
      <div class="nearby-list">
        <PlaceCard 
          v-for="spot in nearbySpots" 
          :key="spot.id" 
          :spot="spot"
          @click="viewDetail(spot)"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store/appStore';
import { MapPin as MapPinIcon } from 'lucide-vue-next';
import PlaceCard from '../components/PlaceCard.vue';

const router = useRouter();
const store = useAppStore();

const nearbySpots = computed(() => {
  return [...store.allSpots].sort((a, b) => a.distance - b.distance);
});

const viewDetail = (spot) => {
  store.setSelectedSpot(spot);
  router.push(`/detail/${spot.id}`);
};

const getMarkerStyle = (spot) => {
  // Purely visual distribution
  const angle = (spot.distance * 137.5) % 360;
  const radius = spot.distance * 15;
  return {
    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
  };
};
</script>

<style scoped>
.near-me-view {
  padding: 24px;
}

.header {
  margin-bottom: 24px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 14px;
}

.map-simulation {
  height: 240px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
}

.user-marker {
  position: relative;
  color: var(--primary);
  z-index: 10;
}

.pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: rgba(212, 175, 55, 0.2);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
}

.radar {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 50%;
}

.spot-marker {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--text-muted);
  border-radius: 50%;
  opacity: 0.5;
}

.spot-marker.in-range {
  background: var(--primary);
  box-shadow: 0 0 10px var(--primary);
  opacity: 1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.toggle-container span {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
}

.toggle-container span.active {
  color: var(--primary);
}

.switch {
  width: 36px;
  height: 18px;
  background: var(--glass-border);
  border-radius: 10px;
  position: relative;
  transition: background 0.3s ease;
}

.switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.switch.on {
  background: var(--primary);
}

.switch.on::after {
  transform: translateX(18px);
}
</style>
