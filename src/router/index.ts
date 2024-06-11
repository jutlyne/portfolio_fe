import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import user from './user'
import admin from './admin'
import { ROUTE_TYPE } from '@/constants/constant'

const UserPage = () => import('../page/user/UserPage.vue')
const AdminPage = () => import('../page/admin/AdminPage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: UserPage,
      children: user
    },
    {
      path: '/admin/',
      component: AdminPage,
      children: admin
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error/404'
    }
  ] as RouteRecordRaw[]
})

const isAuthenticated = () => {
  return !!localStorage.getItem('adminAccessToken')
}

router.beforeEach((to, from, next) => {
  if (!to.path.startsWith('/admin/')) {
    return next()
  }

  const requiresAuth = to.matched.some((record) => record.meta.routeType === ROUTE_TYPE.AUTH)
  const isUnauthRoute = to.matched.some((record) => record.meta.routeType === ROUTE_TYPE.UNAUTH)

  if (requiresAuth && !isAuthenticated()) {
    next({ name: 'admin.login' })
  } else if (isUnauthRoute && isAuthenticated()) {
    next({ name: 'admin.blog' })
  } else {
    next()
  }
})

export default router
