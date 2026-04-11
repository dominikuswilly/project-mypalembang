import { defineStore } from 'pinia';
import { topSpots, categories } from '../data/mockData';

export const useAppStore = defineStore('app', {
  state: () => ({
    allSpots: topSpots,
    categories: categories,
    activeCategory: 'destinations',
    activeSubCategory: 'All',
    sortBy: 'rating', // 'rating' | 'distance'
    searchQuery: '',
    nearMeEnabled: false,
    selectedSpot: null,
    favorites: [], // Array of spot IDs
    scrollPositions: {}, // Map of path -> scrollY
  }),
  getters: {
    getSpotsByCategory: (state) => (catId) => {
      let spots = state.allSpots.filter(s => s.category === catId);
      
      if (state.activeSubCategory !== 'All') {
        spots = spots.filter(s => s.subcategory === state.activeSubCategory);
      }
      
      return spots.sort((a, b) => {
        if (state.sortBy === 'distance') return a.distance - b.distance;
        return b.rating - a.rating;
      });
    },
    pickedForYou: (state) => {
      // Logic: High rating (>4.5) and relative proximity (<3km)
      return state.allSpots
        .filter(s => s.rating >= 4.6 && s.distance <= 3.0)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
    },
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
    },
    isFavorite: (state) => (id) => state.favorites.includes(id)
  },
  actions: {
    setActiveCategory(catId) {
      this.activeCategory = catId;
      this.activeSubCategory = 'All'; // Reset subcat when switching main cat
    },
    setSubCategory(subCat) {
      this.activeSubCategory = subCat;
    },
    setSortBy(sort) {
      this.sortBy = sort;
    },
    setSelectedSpot(spot) {
      this.selectedSpot = spot;
    },
    toggleNearMe() {
      this.nearMeEnabled = !this.nearMeEnabled;
    },
    toggleFavorite(id) {
      const index = this.favorites.indexOf(id);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(id);
        // Visual haptic simulation if supported
        if ('vibrate' in navigator) {
          navigator.vibrate(10);
        }
      }
    },
    saveScrollPosition(path, scrollY) {
      this.scrollPositions[path] = scrollY;
    }
  }
});
