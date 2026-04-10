<template>
  <div v-if="spot" class="detail-view">
    <div class="hero">
      <img :src="spot.image" :alt="spot.name" />
      <button class="back-btn glass" @click="$router.back()">
        <ChevronLeftIcon :size="24" />
      </button>
      <button class="favorite-btn glass" @click="toggleFavorite">
        <HeartIcon :size="20" :fill="isFavorite ? 'currentColor' : 'none'" />
      </button>
    </div>

    <div class="content animate-fade">
      <div class="header">
        <div class="main-info">
          <h1>{{ spot.name }}</h1>
          <div class="meta">
            <span class="category">{{ spot.category }}</span>
            <span class="dot">•</span>
            <span class="subcategory">{{ spot.subcategory }}</span>
          </div>
        </div>
        <div class="rating glass">
          <StarIcon :size="16" fill="currentColor" />
          <span>{{ spot.rating }}</span>
        </div>
      </div>

      <div class="stats glass">
        <div class="stat">
          <MapPinIcon :size="18" />
          <span>{{ spot.distance }} km</span>
        </div>
        <div class="stat">
          <UsersIcon :size="18" />
          <span>{{ spot.reviews }} reviews</span>
        </div>
        <div v-if="spot.sustainability" class="stat sustainability">
          <LeafIcon :size="18" />
          <span>Eco Spot</span>
        </div>
      </div>

      <div class="description-section">
        <h2>About this place</h2>
        <p>{{ spot.description }}</p>
      </div>

      <div class="tags">
        <span v-for="tag in spot.tags" :key="tag" class="tag glass">#{{ tag }}</span>
      </div>

      <div class="actions">
        <button class="action-btn secondary glass">
          <Share2Icon :size="20" /> Share
        </button>
        <button class="action-btn primary">
          Visit Now
        </button>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <p>Spot not found.</p>
    <button @click="$router.push('/')">Go Home</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../store/appStore';
import { 
  ChevronLeft as ChevronLeftIcon, 
  Heart as HeartIcon, 
  Star as StarIcon, 
  MapPin as MapPinIcon, 
  Users as UsersIcon, 
  Leaf as LeafIcon,
  Share2 as Share2Icon
} from 'lucide-vue-next';

const route = useRoute();
const store = useAppStore();
const spot = ref(null);
const isFavorite = ref(false);

onMounted(() => {
  const found = store.allSpots.find(s => s.id === route.params.id);
  if (found) {
    spot.value = found;
  }
});

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
</script>

<style scoped>
.detail-view {
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 40px;
}

.hero {
  height: 40vh;
  position: relative;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.back-btn, .favorite-btn {
  position: absolute;
  top: 24px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  cursor: pointer;
}

.back-btn { left: 24px; }
.favorite-btn { right: 24px; }

.content {
  margin-top: -24px;
  background: var(--bg);
  border-radius: 24px 24px 0 0;
  padding: 32px 24px;
  position: relative;
  z-index: 10;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.main-info h1 {
  font-size: 28px;
  margin-bottom: 4px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-muted);
  text-transform: capitalize;
}

.category { color: var(--primary); font-weight: 600; }

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  color: var(--primary);
  font-weight: 700;
}

.stats {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  padding: 16px;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.sustainability {
  color: var(--accent-green);
}

.description-section h2 {
  font-size: 20px;
  margin-bottom: 12px;
}

.description-section p {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 24px;
}

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.tag {
  padding: 6px 16px;
  border-radius: 12px;
  font-size: 12px;
}

.actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  flex: 1;
  height: 56px;
  border-radius: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  border: none;
}

.action-btn.primary {
  background: var(--primary);
  color: var(--bg);
}

.action-btn.secondary {
  color: var(--text);
}
</style>
