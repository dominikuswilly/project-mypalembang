<template>
  <div class="category-detail-view" ref="scrollContainer">
    <!-- Header -->
    <header class="header animate-fade">
      <button class="back-btn glass" @click="goBack">
        <ArrowLeftIcon :size="20" />
      </button>
      <div class="title-section">
        <h1 class="gradient-text">{{ category?.name }}</h1>
        <p class="subtitle">{{ categorySubtitle }}</p>
      </div>
    </header>

    <!-- Filter Chips -->
    <div class="sticky-filters glass animate-fade" style="animation-delay: 0.1s">
      <FilterChips 
        :subcategories="['All', ...(category?.subcategories || [])]" 
        :active="store.activeSubCategory"
        @select="store.setSubCategory"
      />
      
      <div class="actions">
        <div class="sort-select">
          <button 
            v-for="mode in ['rating', 'distance']" 
            :key="mode"
            class="sort-btn"
            :class="{ active: store.sortBy === mode }"
            @click="store.setSortBy(mode)"
          >
            {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="results animate-fade" style="animation-delay: 0.2s">
      <!-- Picked for you section (only on initial load/All) -->
      <section v-if="store.activeSubCategory === 'All' && pickedSpots.length > 0" class="picked-section">
        <div class="section-header">
          <SparklesIcon :size="16" class="sparkle-icon" />
          <h3>Picked for you</h3>
        </div>
        <div class="picked-grid">
          <div 
            v-for="spot in pickedSpots" 
            :key="spot.id" 
            class="picked-card glass"
            @click="viewDetail(spot)"
          >
            <img :src="spot.image" :alt="spot.name" />
            <div class="picked-overlay">
              <h4>{{ spot.name }}</h4>
              <div class="picked-meta">
                <span>{{ spot.rating }}</span>
                <StarIcon :size="10" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="results-info">
        <span>{{ filteredSpots.length }} destinations found</span>
      </div>

      <!-- Skeletons vs Real Cards -->
      <div v-if="loading" class="list">
        <PlaceSkeleton v-for="i in 3" :key="i" />
      </div>

      <div v-else-if="filteredSpots.length > 0" class="list">
        <PlaceCard 
          v-for="spot in filteredSpots" 
          :key="spot.id" 
          :spot="spot"
          @click="viewDetail(spot)"
        />
      </div>

      <div v-else class="no-results">
        <SearchIcon :size="48" class="icon" />
        <p>No matches in this category.</p>
      </div>
    </div>

    <!-- Floating Map Toggle -->
    <button class="map-toggle-fab animate-fade" @click="$router.push('/map')">
      <MapIcon :size="20" />
      <span>Map View</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '../store/appStore';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Sparkles as SparklesIcon,
  Star as StarIcon,
  Map as MapIcon,
  Search as SearchIcon
} from 'lucide-vue-next';
import FilterChips from '../components/FilterChips.vue';
import PlaceCard from '../components/PlaceCard.vue';
import PlaceSkeleton from '../components/PlaceSkeleton.vue';

const route = useRoute();
const router = useRouter();
const store = useAppStore();
const loading = ref(true);

const categoryId = computed(() => route.params.id);
const category = computed(() => store.categories.find(c => c.id === categoryId.value));

const categorySubtitle = computed(() => {
  if (categoryId.value === 'food') return 'Savor the best of South Sumatra';
  if (categoryId.value === 'destinations') return 'Explore the historical landmarks';
  return 'Handpicked places for you';
});

const filteredSpots = computed(() => store.getSpotsByCategory(categoryId.value));
const pickedSpots = computed(() => store.pickedForYou);

const goBack = () => {
  router.back();
};

const viewDetail = (spot) => {
  store.setSelectedSpot(spot);
  router.push(`/detail/${spot.id}`);
};

// Simulated Loading
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
    // Restore scroll
    const savedPos = store.scrollPositions[route.path];
    if (savedPos) {
      window.scrollTo(0, savedPos);
    }
  }, 600);
});

// Save Scroll Position
onBeforeUnmount(() => {
  store.saveScrollPosition(route.path, window.scrollY);
});
</script>

<style scoped>
.category-detail-view {
  padding: 24px 20px 100px;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  border: 1px solid var(--glass-border);
}

.title-section h1 {
  font-size: 24px;
  margin: 0;
}

.subtitle {
  font-size: 13px;
  color: var(--text-muted);
}

.sticky-filters {
  position: sticky;
  top: 10px;
  z-index: 100;
  padding: 16px;
  margin: 0 -20px 24px;
  background: var(--surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 0 0 24px 24px;
  border-bottom: 1px solid var(--glass-border);
}

.actions {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.sort-select {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px;
  border-radius: 100px;
  gap: 4px;
}

.sort-btn {
  background: none;
  border: none;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-btn.active {
  background: var(--primary);
  color: var(--bg);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 16px;
  color: var(--text);
}

.sparkle-icon {
  color: var(--primary);
}

.picked-section {
  margin-bottom: 32px;
}

.picked-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.picked-card {
  height: 120px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.picked-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.picked-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 12px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.picked-overlay h4 {
  font-size: 12px;
  color: white;
  margin: 0;
}

.picked-meta {
  background: rgba(0,0,0,0.4);
  padding: 2px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: var(--primary);
}

.results-info {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
}

.no-results {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted);
}

.no-results .icon {
  margin-bottom: 12px;
  opacity: 0.3;
}

.map-toggle-fab {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary);
  color: var(--bg);
  padding: 12px 24px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
  border: none;
  font-weight: 700;
  z-index: 900;
  cursor: pointer;
}

.map-toggle-fab:active {
  transform: translateX(-50%) scale(0.95);
}
</style>
