import { ROUTE_TYPE } from '@/constants/constant'

const Blog = () => import('../views/admins/blog/BlogView.vue')
const Auth = () => import('../views/admins/login/LoginView.vue')

export default [
  {
    path: '',
    name: 'admin.home',
    redirect: '/login'
  },
  {
    path: 'login',
    name: 'admin.login',
    component: Auth,
    meta: {
      routeType: ROUTE_TYPE.UNAUTH
    }
  },
  {
    path: 'blog',
    name: 'admin.blog',
    component: Blog,
    meta: {
      routeType: ROUTE_TYPE.AUTH
    }
  }
]
