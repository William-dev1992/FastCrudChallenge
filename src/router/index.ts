import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Start from '../views/Start.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: Start
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export { router }
