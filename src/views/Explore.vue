<template>
  <div class="explore-view">
    <header class="header animate-fade">
      <div class="search-container glass">
        <div class="search-input">
          <SearchIcon :size="20" />
          <input 
            type="text" 
            placeholder="Search Palembang..." 
            v-model="store.searchQuery"
          />
        </div>
        <button class="filter-btn" @click="toggleFilters">
          <SlidersIcon :size="20" />
        </button>
      </div>
      
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
          @click="store.setActiveCategory(cat.id)"
        >
          {{ cat.name }}
        </button>
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
import { useRouter } from 'vue-router';
import { useAppStore } from '../store/appStore';
import { Search as SearchIcon, Sliders as SlidersIcon } from 'lucide-vue-next';
import PlaceCard from '../components/PlaceCard.vue';

const router = useRouter();
const store = useAppStore();

const viewDetail = (spot) => {
  store.setSelectedSpot(spot);
  router.push(`/detail/${spot.id}`);
};

const resetFilters = () => {
  store.searchQuery = '';
  store.activeCategory = 'all';
};

const toggleFilters = () => {
  // Logic for a filter modal could go here
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
  padding: 8px;
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
}

.search-input input:focus {
  outline: none;
}

.filter-btn {
  background: var(--primary);
  border: none;
  color: var(--bg);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.category-pills {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.pill {
  white-space: nowrap;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pill.active {
  background: var(--primary);
  color: var(--bg);
  border-color: var(--primary);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 24px;
}

.count {
  font-size: 14px;
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
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 8px 24px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
}
</style>
