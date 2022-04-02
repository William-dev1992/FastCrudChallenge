import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'
import Statistics from '../views/Statistics.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: Start
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export { router }
