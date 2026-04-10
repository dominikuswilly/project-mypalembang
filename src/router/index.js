import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Explore from '../views/Explore.vue';
import NearMe from '../views/NearMe.vue';
import Detail from '../views/Detail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/explore', name: 'Explore', component: Explore },
  { path: '/near-me', name: 'NearMe', component: NearMe },
  { path: '/detail/:id', name: 'Detail', component: Detail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
