<template>
  <div class="place-card glass" @click="$emit('click')">
    <div class="image-container">
      <img :src="spot.image" :alt="spot.name" />
      <div v-if="spot.sustainability" class="sustainability-badge">
        <LeafIcon :size="12" /> Eco-friendly
      </div>
      <div class="rating-badge">
        <StarIcon :size="12" fill="currentColor" /> {{ spot.rating }}
      </div>
    </div>
    <div class="content">
      <div class="header">
        <h3 class="name">{{ spot.name }}</h3>
        <span class="distance">{{ spot.distance }} km</span>
      </div>
      <p class="description">{{ spot.description }}</p>
      <div class="tags">
        <span v-for="tag in spot.tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star as StarIcon, Leaf as LeafIcon } from 'lucide-vue-next';

defineProps({
  spot: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
</script>

<style scoped>
.place-card {
  margin-bottom: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.place-card:active {
  transform: scale(0.98);
}

.image-container {
  height: 180px;
  position: relative;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.place-card:hover img {
  transform: scale(1.05);
}

.sustainability-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--accent-green);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  color: var(--primary);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}

.content {
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.name {
  font-size: 18px;
  color: var(--text);
  margin: 0;
}

.distance {
  font-size: 12px;
  color: var(--primary);
  font-weight: 600;
}

.description {
  font-size: 13px;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 10px;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 6px;
}
</style>
