<template>
  <div class="explore-view">
    <header class="header animate-fade">
      <div class="search-container glass">
        <div class="search-input">
          <SearchIcon :size="20" />
          <input 
            type="text" 
            :placeholder="searchPlaceholder" 
            v-model="store.searchQuery"
          />
        </div>
        <button class="filter-btn glass" @click="toggleFilters">
          <SlidersIcon :size="20" />
        </button>
      </div>
      
      <div class="pills-wrapper">
        <div class="category-pills no-scrollbar">
          <button 
            class="pill glass" 
            :class="{ active: store.activeCategory === 'all' }"
            @click="store.setActiveCategory('all')"
          >
            All
          </button>
          <button 
            v-for="cat in store.categories" 
            :key="cat.id" 
            class="pill glass"
            :class="{ active: store.activeCategory === cat.id }"
            @click="handleCategoryClick(cat.id)"
          >
            {{ cat.name }}
          </button>
        </div>
        <div class="fade-right"></div>
      </div>
    </header>

    <div class="results animate-fade" style="animation-delay: 0.1s">
      <div class="results-header">
        <span class="count">{{ store.filteredSpots.length }} results found</span>
        <div class="sort">
          <span>Sort by: <b>Popular</b></span>
        </div>
      </div>
      
      <div v-if="store.filteredSpots.length > 0">
        <PlaceCard 
          v-for="spot in store.filteredSpots" 
          :key="spot.id" 
          :spot="spot"
          @click="viewDetail(spot)"
        />
      </div>
      
      <div v-else class="no-results">
        <SearchIcon :size="48" class="icon" />
        <h3>No results found</h3>
        <p>Try matching your search or filters to something else.</p>
        <button class="reset-btn" @click="resetFilters">Reset Filters</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store/appStore';
import { Search as SearchIcon, Sliders as SlidersIcon } from 'lucide-vue-next';
import PlaceCard from '../components/PlaceCard.vue';

const router = useRouter();
const store = useAppStore();

const searchPlaceholder = computed(() => {
  const category = store.categories.find(c => c.id === store.activeCategory);
  if (category) {
    if (category.id === 'destinations') return 'Search landmarks or bridges...';
    if (category.id === 'food') return 'Search pempek or cafes...';
    return `Search in ${category.name}...`;
  }
  return 'Search Palembang...';
});

const viewDetail = (spot) => {
  store.setSelectedSpot(spot);
  router.push(`/detail/${spot.id}`);
};

const handleCategoryClick = (id) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(5);
  }
  store.setActiveCategory(id);
  router.push(`/category/${id}`);
};

const resetFilters = () => {
  store.searchQuery = '';
  store.activeCategory = 'all';
};

const toggleFilters = () => {
  // Logic for a filter modal
};
</script>

<style scoped>
.explore-view {
  padding: 24px;
}

.header {
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 100;
  padding: 8px 0 16px;
  margin: 0 -24px;
  padding-left: 24px;
  padding-right: 24px;
}

.search-container {
  display: flex;
  gap: 12px;
  padding: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  color: var(--text-muted);
}

.search-input input {
  background: none;
  border: none;
  color: var(--text);
  width: 100%;
  font-family: inherit;
  font-size: 15px;
}

.search-input input:focus {
  outline: none;
}

.filter-btn {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  color: var(--primary);
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: var(--glass-border);
}

.pills-wrapper {
  position: relative;
  margin: 0 -24px;
  padding: 0 24px;
}

.category-pills {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.fade-right {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 8px;
  width: 60px;
  background: linear-gradient(to right, transparent, var(--bg));
  pointer-events: none;
}

.pill {
  white-space: nowrap;
  padding: 10px 22px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pill.active {
  background: var(--primary);
  color: var(--bg);
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 24px;
}

.count {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
}

.sort {
  font-size: 14px;
  color: var(--text-muted);
}

.sort b {
  color: var(--primary);
}

.no-results {
  text-align: center;
  padding: 60px 20px;
}

.no-results .icon {
  color: var(--glass-border);
  margin-bottom: 16px;
}

.no-results h3 {
  margin-bottom: 8px;
}

.no-results p {
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 24px;
}

.reset-btn {
  background: none;
  border: 1.5px solid var(--primary);
  color: var(--primary);
  padding: 10px 28px;
  border-radius: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: rgba(212, 175, 55, 0.1);
}
</style>
