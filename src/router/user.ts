import { ROUTE_TYPE } from '@/constants/constant'

const Home = () => import('../pages/users/home/HomePage.vue')
const Blog = () => import('../pages/users/blog/ListPage.vue')
const ResumeView = () => import('../pages/users/resume/ResumePage.vue')
const BlogDetail = () => import('../pages/users/blog_detail/DetailPage.vue')
const ResponseView = () => import('../pages/error/response_status/ResponseView.vue')

export default [
  {
    path: '',
    name: 'home',
    component: Home,
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
    path: 'resume',
    name: 'resume',
    component: ResumeView,
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
