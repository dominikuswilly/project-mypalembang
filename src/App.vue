<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <BottomNav v-if="!$route.meta.hideNav" />
  </div>
</template>

<script setup>
import BottomNav from './components/BottomNav.vue';
</script>

<style>
.app-container {
  padding-bottom: 100px; /* Space for BottomNav */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(1.02);
}
</style>
