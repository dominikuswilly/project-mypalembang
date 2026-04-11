import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Explore from '../views/Explore.vue';
import MapView from '../views/MapView.vue';
import Detail from '../views/Detail.vue';
import Events from '../views/Events.vue';
import CategoryDetail from '../views/CategoryDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/explore', name: 'Explore', component: Explore },
  { path: '/map', name: 'Map', component: MapView },
  { path: '/detail/:id', name: 'Detail', component: Detail },
  { path: '/events', name: 'Events', component: Events },
  { path: '/category/:id', name: 'CategoryDetail', component: CategoryDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
