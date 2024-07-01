import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import user from './user'
import admin from './admin'

const UserLayout = () => import('../layouts/user/UserLayout.vue')
const AdminLayout = () => import('../layouts/admin/AdminLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: user
    },
    {
      path: '/admin/',
      component: AdminLayout,
      children: admin
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error/404'
    }
  ] as RouteRecordRaw[]
})

export default router
