<template>
  <nav class="bottom-nav glass">
    <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
      <HomeIcon :size="24" />
      <span>Home</span>
    </router-link>
    <router-link to="/explore" class="nav-item" :class="{ active: $route.path === '/explore' }">
      <CompassIcon :size="24" />
      <span>Explore</span>
    </router-link>
    <router-link to="/near-me" class="nav-item" :class="{ active: $route.path === '/near-me' }">
      <MapPinIcon :size="24" />
      <span>Near Me</span>
    </router-link>
    <router-link to="/events" class="nav-item" :class="{ active: $route.path === '/events' }">
      <CalendarIcon :size="24" />
      <span>Events</span>
    </router-link>
  </nav>
</template>

<script setup>
import { Home as HomeIcon, Compass as CompassIcon, MapPin as MapPinIcon, Calendar as CalendarIcon } from 'lucide-vue-next';
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 440px;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  z-index: 1000;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-muted);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 4px;
  flex: 1;
}

.nav-item span {
  font-size: 10px;
  font-weight: 500;
}

.nav-item.active {
  color: var(--primary);
  transform: translateY(-5px);
}

.nav-item.active svg {
  filter: drop-shadow(0 0 8px var(--primary));
}
</style>
