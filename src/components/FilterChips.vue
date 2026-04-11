<template>
  <div class="filter-chips no-scrollbar">
    <button 
      v-for="sub in subcategories" 
      :key="sub" 
      class="chip glass" 
      :class="{ active: active === sub }"
      @click="$emit('select', sub)"
    >
      {{ sub }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  subcategories: {
    type: Array,
    required: true
  },
  active: {
    type: String,
    required: true
  }
});

defineEmits(['select']);
</script>

<style scoped>
.filter-chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  margin: 0 -20px;
  padding-left: 20px;
  padding-right: 20px;
}

.chip {
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  border: 1px solid var(--glass-border);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chip.active {
  background: var(--primary);
  color: var(--bg);
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  transform: translateY(-1px);
}

.chip:active {
  transform: scale(0.95);
}
</style>
