import { ROUTE_TYPE } from '@/constants/constant'

const Blog = () => import('../views/users/blog/BlogView.vue')
const BlogDetail = () => import('../views/users/blog_detail/BlogDetailView.vue')
const NotFound = () => import('../views/error/404/NotFoundView.vue')
const InternalError = () => import('../views/error/500/InternalErrorView.vue')

export default [
  {
    path: '',
    redirect: '/blog',
    meta: {
      routeType: ROUTE_TYPE.UNAUTH
    }
  },
  {
    path: 'blog',
    name: 'blog',
    component: Blog,
    meta: {
      routeType: ROUTE_TYPE.UNAUTH
    }
  },
  {
    path: 'blog/:id',
    name: 'detail',
    component: BlogDetail,
    meta: {
      routeType: ROUTE_TYPE.UNAUTH
    }
  },
  {
    path: '/error/404',
    name: '404',
    component: NotFound
  },
  {
    path: '/error/500',
    name: '500',
    component: InternalError
  }
]
