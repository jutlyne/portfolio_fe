import { ROUTE_TYPE } from '@/constants/constant'

const Blog = () => import('../views/admins/blog/list/BlogView.vue')
const BlogCreate = () => import('../views/admins/blog/create/BlogCreateView.vue')
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
    name: 'admin.blog.index',
    component: Blog,
    meta: {
      routeParent: 'blog',
      routeType: ROUTE_TYPE.AUTH
    }
  },
  {
    path: 'blog/create',
    name: 'admin.blog.create',
    component: BlogCreate,
    meta: {
      routeParent: 'blog',
      routeType: ROUTE_TYPE.AUTH
    }
  }
]
