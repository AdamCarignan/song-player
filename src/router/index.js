import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/HomeView.vue')
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    name: 'manage',
    path: '/manage',
    component: () => import('@/views/ManageView.vue'),
    beforeEnter: (to, from, next) => {
      next()
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: () => import('@/views/SongView.vue')
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const store = useUserStore()
  if (store.userLoggedIn) {
    next()
    return
  } else {
    next({ name: 'home' })
  }
})

export default router
