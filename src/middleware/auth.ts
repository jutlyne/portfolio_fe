import { ROUTE_TYPE } from '@/constants/constant'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordNormalized
} from 'vue-router'
import { useCookies } from 'vue3-cookies'

const isAuthenticated = () => {
  const { cookies } = useCookies()

  return !!localStorage.getItem('adminAccessToken') && !!cookies.get('adminAccessTokenSignature')
}

export const authenticateMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!to.path.startsWith('/admin/')) {
    return next()
  }

  const requiresAuth = to.matched.some(
    (record: RouteRecordNormalized) => record.meta.routeType === ROUTE_TYPE.AUTH
  )
  const isUnauthRoute = to.matched.some(
    (record: RouteRecordNormalized) => record.meta.routeType === ROUTE_TYPE.UNAUTH
  )

  if (requiresAuth && !isAuthenticated()) {
    next({ name: 'admin.login' })
  } else if (isUnauthRoute && isAuthenticated()) {
    next({ name: 'admin.blogs.index' })
  } else {
    next()
  }
}
