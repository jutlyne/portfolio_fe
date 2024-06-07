const Blog = () => import('../views/users/blog/BlogView.vue')
const NotFound = () => import('../views/error/404/NotFoundView.vue')

export default [
  {
    path: '/blog',
    name: 'blog',
    component: Blog
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
