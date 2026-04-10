<template>
  <div class="home-view">
    <header class="header animate-fade">
      <div class="user-profile">
        <div class="avatar glass">
          <UserIcon :size="20" />
        </div>
        <div class="greeting">
          <p>Welcome to Palembang,</p>
          <h1 class="gradient-text">Explorer!</h1>
        </div>
      </div>
      <div class="search-bar glass">
        <SearchIcon :size="18" class="search-icon" />
        <input 
          type="text" 
          placeholder="Search destinations, food..." 
          v-model="store.searchQuery"
          @focus="$router.push('/explore')"
        />
      </div>
    </header>

    <section class="section animate-fade" style="animation-delay: 0.1s">
      <div class="section-header">
        <h2>Categories</h2>
      </div>
      <CategoryGrid 
        :categories="store.categories" 
        :activeCategory="store.activeCategory"
        @select="store.setActiveCategory"
      />
    </section>

    <section class="section animate-fade" style="animation-delay: 0.2s">
      <div class="section-header">
        <h2>Must Visit</h2>
        <router-link to="/explore" class="see-all">See All</router-link>
      </div>
      <div class="horizontal-scroll no-scrollbar">
        <div 
          v-for="spot in store.allSpots.slice(0, 3)" 
          :key="spot.id" 
          class="featured-card glass"
          @click="viewDetail(spot)"
        >
          <img :src="spot.image" :alt="spot.name" />
          <div class="overlay">
            <h3>{{ spot.name }}</h3>
            <span class="subcategory">{{ spot.subcategory }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section animate-fade" style="animation-delay: 0.3s">
      <div class="section-header">
        <h2>Top Rated</h2>
      </div>
      <PlaceCard 
        v-for="spot in store.topRated" 
        :key="spot.id" 
        :spot="spot"
        @click="viewDetail(spot)"
      />
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAppStore } from '../store/appStore';
import { User as UserIcon, Search as SearchIcon } from 'lucide-vue-next';
import CategoryGrid from '../components/CategoryGrid.vue';
import PlaceCard from '../components/PlaceCard.vue';

const router = useRouter();
const store = useAppStore();

const viewDetail = (spot) => {
  store.setSelectedSpot(spot);
  router.push(`/detail/${spot.id}`);
};
</script>

<style scoped>
.home-view {
  padding: 24px;
}

.header {
  margin-bottom: 32px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.greeting p {
  font-size: 14px;
  color: var(--text-muted);
}

.greeting h1 {
  font-size: 24px;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
}

.search-bar input {
  background: none;
  border: none;
  color: var(--text);
  width: 100%;
  font-family: inherit;
  font-size: 14px;
}

.search-bar input:focus {
  outline: none;
}

.search-icon {
  color: var(--text-muted);
}

.section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 20px;
}

.see-all {
  font-size: 14px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

.horizontal-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  margin: 0 -24px;
  padding: 0 24px 8px;
}

.featured-card {
  min-width: 260px;
  height: 160px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
}

.featured-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
}

.overlay h3 {
  font-size: 16px;
}

.subcategory {
  font-size: 12px;
  color: var(--primary);
}
</style>
