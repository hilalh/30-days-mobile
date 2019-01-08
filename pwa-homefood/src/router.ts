import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {layout: 'app'},
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {layout: 'default'},
      component: () => import('@/pages/About.vue'),
    },
  ],
});
