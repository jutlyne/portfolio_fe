import { createRouter, createWebHistory } from 'vue-router'
import user from './user'

const UserPage = () => import('../page/user/UserPage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserPage,
      children: user
    }
  ]
})

export default router
