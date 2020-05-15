import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/home-page',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/RoomsInfo/:id',
    name: 'RoomsInfo',
    component: () => import('../views/RoomsInfo'),
    props: true
  },
  {
    path: '*',
    redirect: '/home-page'
  }
];

const router = new VueRouter({
  routes
});

export default router;
