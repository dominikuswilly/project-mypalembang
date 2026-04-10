<template>
  <div class="place-card glass" @click="$emit('click')">
    <div class="image-container">
      <img :src="spot.image" :alt="spot.name" />
      <div v-if="spot.sustainability" class="sustainability-badge">
        <LeafIcon :size="10" /> Eco-friendly
      </div>
    </div>
    <div class="content">
      <div class="header">
        <div class="title-section">
          <h3 class="name">{{ spot.name }}</h3>
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
  margin-bottom: 24px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.place-card:active {
  transform: scale(0.98);
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

.name {
  font-size: 19px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  line-height: 1.2;
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
