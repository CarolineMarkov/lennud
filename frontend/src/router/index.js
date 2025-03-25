import { createRouter, createWebHashHistory } from 'vue-router'
import LennuValimine from '@/views/LennuValimine.vue'
import IstekohtadeSoovitamine from '@/views/IstekohtadeSoovitamine.vue'


const routes = [
  {
    path: '/',
    name: 'lennuvalimine/',
    component: LennuValimine
  },
  {
    path: '/istekohad/:id',
    name: 'IstekohtadeSoovitamine', 
    component: IstekohtadeSoovitamine,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
