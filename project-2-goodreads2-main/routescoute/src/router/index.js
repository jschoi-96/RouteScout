import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '../firebaseConfig';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('../views/LandingView.vue')
  },
  {
    path: '/trips',
    name: 'trips',
    component: () => import('../views/TripsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/trips/:id',
    name: 'trip',
    component: () => import('../views/TripView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/trips/:id/:destinationId',
    name: 'destination',
    component: () => import('../views/DestinationView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/tripExample',
    name: 'tripExample',
    component: () => import('../components/TripMap.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/')
    // could also just fire off a redirect login here, or redirect based on a meta property!
  } else {
    next()
  }
})

export default router;
