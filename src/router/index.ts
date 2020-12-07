import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Main from '../views/Main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/history/:type',
    name: 'History',
    props: true,
    component: () => import('../views/History.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
