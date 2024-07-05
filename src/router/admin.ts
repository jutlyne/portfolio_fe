import { ROUTE_TYPE } from '@/constants/constant'

const Blog = () => import('../pages/admins/blog/list/ListPage.vue')
const BlogCreate = () => import('../pages/admins/blog/create/CreatePage.vue')
const BlogEdit = () => import('../pages/admins/blog/edit/EditPage.vue')
const Auth = () => import('../pages/admins/login/LoginPage.vue')
const Comment = () => import('../pages/admins/comment/list/ListPage.vue')
const Profile = () => import('../pages/admins/profile/ProfilePage.vue')

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
    path: 'blogs',
    name: 'admin.blogs.index',
    component: Blog,
    meta: {
      routeParent: 'blog',
      routeType: ROUTE_TYPE.AUTH
    }
  },
  {
    path: 'blogs/create',
    name: 'admin.blogs.create',
    component: BlogCreate,
    meta: {
      routeParent: 'blog',
      routeType: ROUTE_TYPE.AUTH
    }
  },
  {
    path: 'blogs/edit/:id',
    name: 'admin.blogs.edit',
    component: BlogEdit,
    meta: {
      routeParent: 'blog',
      routeType: ROUTE_TYPE.AUTH
    }
  },
  {
    path: 'comments',
    name: 'admin.comments.index',
    component: Comment,
    meta: {
      routeParent: 'comment',
      routeType: ROUTE_TYPE.AUTH
    }
  },
  {
    path: 'profile',
    name: 'admin.profile',
    component: Profile,
    meta: {
      routeParent: 'profile',
      routeType: ROUTE_TYPE.AUTH
    }
  }
]
