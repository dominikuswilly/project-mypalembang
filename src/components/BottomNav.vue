<template>
  <nav class="bottom-nav-container">
    <div class="bottom-nav glass">
      <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
        <div class="active-pill"></div>
        <HomeIcon :size="20" />
        <span>Home</span>
      </router-link>
      <router-link to="/explore" class="nav-item" :class="{ active: $route.path === '/explore' }">
        <div class="active-pill"></div>
        <CompassIcon :size="20" />
        <span>Explore</span>
      </router-link>
      <router-link to="/map" class="nav-item" :class="{ active: $route.path === '/map' }">
        <div class="active-pill"></div>
        <MapIcon :size="20" />
        <span>Map</span>
      </router-link>
      <router-link to="/events" class="nav-item" :class="{ active: $route.path === '/events' }">
        <div class="active-pill"></div>
        <CalendarIcon :size="20" />
        <span>Events</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { Home as HomeIcon, Compass as CompassIcon, Map as MapIcon, Calendar as CalendarIcon } from 'lucide-vue-next';
</script>

<style scoped>
.bottom-nav-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 20px calc(20px + var(--safe-area-bottom));
  z-index: 1000;
  pointer-events: none;
}

.bottom-nav {
  width: 100%;
  max-width: 400px;
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  pointer-events: auto;
}

.nav-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-muted);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 2px;
  flex: 1;
  height: 100%;
}

.nav-item span {
  font-size: 10px;
  font-weight: 600;
  opacity: 0.8;
}

.active-pill {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 48px;
  height: 32px;
  background: var(--primary);
  opacity: 0.15;
  border-radius: 16px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: -1;
}

.nav-item.active {
  color: var(--primary);
}

.nav-item.active .active-pill {
  transform: translate(-50%, -50%) scale(1);
}

.nav-item.active span {
  opacity: 1;
}

.nav-item.active svg {
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
}
</style>
