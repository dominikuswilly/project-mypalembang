<template>
  <div class="category-grid">
    <div 
      v-for="cat in categories" 
      :key="cat.id" 
      class="category-item glass"
      :class="{ active: activeCategory === cat.id }"
      @click="handleSelect(cat.id)"
    >
      <div class="icon-wrapper">
        <component :is="icons[cat.icon]" :size="20" />
      </div>
      <span>{{ cat.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { 
  MapPin, 
  Bed, 
  Utensils, 
  Car, 
  ShieldCheck, 
  Calendar 
} from 'lucide-vue-next';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['select']);
const router = useRouter();

const icons = {
  MapPin,
  Bed,
  Utensils,
  Car,
  ShieldCheck,
  Calendar
};

const handleSelect = (id) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(5);
  }
  emit('select', id);
  router.push(`/category/${id}`);
};
</script>

<style scoped>
.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.category-item span {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
}

.icon-wrapper {
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.category-item.active {
  background: rgba(212, 175, 55, 0.15);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.category-item.active .icon-wrapper {
  color: var(--primary);
}

.category-item.active span {
  color: var(--primary);
}
</style>
