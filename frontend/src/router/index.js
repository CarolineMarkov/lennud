import { createRouter, createWebHashHistory } from 'vue-router'
import LennuValimine from '@/views/LennuValimine.vue'


const routes = [
  {
    path: '/',
    name: 'lennuvalimine',
    component: LennuValimine
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
