import { ROUTE_TYPE } from '@/constants/constant'

const Blog = () => import('../pages/admins/blog/list/ListPage.vue')
const BlogCreate = () => import('../pages/admins/blog/create/CreatePage.vue')
const BlogEdit = () => import('../pages/admins/blog/edit/EditPage.vue')
const Auth = () => import('../pages/admins/login/LoginPage.vue')

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
  },
  {
    path: 'blog/edit/:id',
    name: 'admin.blog.edit',
    component: BlogEdit,
    meta: {
      routeParent: 'blog',
      routeType: ROUTE_TYPE.AUTH
    }
  }
]
