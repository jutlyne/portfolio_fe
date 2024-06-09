const Blog = () => import('../views/users/blog/BlogView.vue')
const BlogDetail = () => import('../views/users/blog_detail/BlogDetailView.vue')
const NotFound = () => import('../views/error/404/NotFoundView.vue')

export default [
  {
    path: '/',
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog
  },
  {
    path: '/blog/:id',
    name: 'detail',
    component: BlogDetail
  },
  {
    path: '/error/404',
    name: '404',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404'
  }
]
