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
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
