<template>
  <div class="place-card glass" :class="{ pressed: isPressed }" @mousedown="pressStart" @mouseup="pressEnd" @mouseleave="pressEnd" @click="handleClick">
    <div class="image-container">
      <img :src="spot.image" :alt="spot.name" />
      <div v-if="spot.sustainability" class="sustainability-badge">
        <LeafIcon :size="10" /> Eco-friendly
      </div>
      <button class="favorite-btn glass" :class="{ active: store.isFavorite(spot.id) }" @click.stop="toggleFavorite">
        <HeartIcon :size="16" :fill="store.isFavorite(spot.id) ? 'currentColor' : 'none'" />
      </button>
    </div>
    <div class="content">
      <div class="header">
        <div class="title-section">
          <div class="name-row">
            <h3 class="name">{{ spot.name }}</h3>
            <span class="status-badge" :class="{ closed: !spot.isOpen }">
              {{ spot.isOpen ? 'Open' : 'Closed' }}
            </span>
          </div>
          <div class="sub-header">
            <span class="distance">{{ spot.distance }} km</span>
            <span class="dot">•</span>
            <div class="rating">
              <StarIcon :size="12" fill="currentColor" />
              <span>{{ spot.rating }}</span>
            </div>
          </div>
        </div>
      </div>
      <p class="description">{{ spot.description }}</p>
      <div class="tags">
        <span v-for="tag in spot.tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../store/appStore';
import { Star as StarIcon, Leaf as LeafIcon, Heart as HeartIcon } from 'lucide-vue-next';

const props = defineProps({
  spot: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['click']);
const store = useAppStore();
const isPressed = ref(false);

const pressStart = () => {
  isPressed.value = true;
};

const pressEnd = () => {
  isPressed.value = false;
};

const handleClick = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(5);
  }
  emit('click');
};

const toggleFavorite = () => {
  store.toggleFavorite(props.spot.id);
};
</script>

<style scoped>
.place-card {
  margin-bottom: 24px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(1);
}

.place-card.pressed {
  transform: scale(0.96);
  opacity: 0.9;
}

.image-container {
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  background: var(--surface);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.place-card:hover img {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.favorite-btn.active {
  color: #ff4757;
  background: rgba(255, 255, 255, 0.9);
  border-color: #ff4757;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
}

.sustainability-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--accent-green);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.content {
  padding: 16px;
}

.header {
  margin-bottom: 12px;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name-row {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.name {
  font-size: 19px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  line-height: 1.2;
  flex: 1;
}

.status-badge {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--accent-green);
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 12px;
}

.status-badge.closed {
  color: #ff4757;
  background: rgba(255, 71, 87, 0.1);
}

.sub-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.distance {
  color: var(--primary);
  font-weight: 700;
}

.dot {
  opacity: 0.3;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--primary);
  font-weight: 700;
}

.description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
