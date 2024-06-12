import { ROUTE_TYPE } from '@/constants/constant'

const Blog = () => import('../views/users/blog/BlogView.vue')
const BlogDetail = () => import('../views/users/blog_detail/BlogDetailView.vue')
const ResponseView = () => import('../views/error/response_status/ResponseView.vue')

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
    path: '/error/:statusCode',
    name: 'error',
    component: ResponseView
  }
]
