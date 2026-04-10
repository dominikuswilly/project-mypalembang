import { defineStore } from 'pinia';
import { topSpots, categories } from '../data/mockData';

export const useAppStore = defineStore('app', {
  state: () => ({
    allSpots: topSpots,
    categories: categories,
    activeCategory: 'destinations',
    searchQuery: '',
    nearMeEnabled: false,
    selectedSpot: null,
  }),
  getters: {
    filteredSpots: (state) => {
      let spots = state.allSpots;
      
      if (state.activeCategory && state.activeCategory !== 'all') {
        spots = spots.filter(s => s.category === state.activeCategory);
      }
      
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        spots = spots.filter(s => 
          s.name.toLowerCase().includes(query) || 
          s.tags.some(t => t.toLowerCase().includes(query))
        );
      }
      
      if (state.nearMeEnabled) {
        spots = spots.filter(s => s.distance <= 5.0);
      }
      
      return spots;
    },
    topRated: (state) => {
      return [...state.allSpots].sort((a, b) => b.rating - a.rating).slice(0, 3);
    }
  },
  actions: {
    setActiveCategory(catId) {
      this.activeCategory = catId;
    },
    setSelectedSpot(spot) {
      this.selectedSpot = spot;
    },
    toggleNearMe() {
      this.nearMeEnabled = !this.nearMeEnabled;
    }
  }
});
