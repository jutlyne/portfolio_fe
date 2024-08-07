import { h } from 'vue'
import { BookOutlined, CommentOutlined, ProfileOutlined } from '@ant-design/icons-vue'
import type { MenuItem } from '@/interfaces/MenuInterface'

export const pageSize = 5
export const pageSizeAdmin = 10
export const limitString = 120

export const ROUTE_TYPE = {
  UNAUTH: 1,
  AUTH: 2
}
export const validErrorStatus = [404, 500]

export const menuItemAdmin: MenuItem[] = [
  {
    key: 'blog',
    label: 'Blogs',
    title: 'Blogs',
    icon: () => h(BookOutlined),
    children: [
      {
        key: 'admin.blogs.index',
        label: 'List',
        title: 'List',
        to: 'admin.blogs.index'
      },
      {
        key: 'admin.blogs.create',
        label: 'Create',
        title: 'Create',
        to: 'admin.blogs.create'
      }
    ]
  },
  {
    key: 'comment',
    label: 'Comments',
    title: 'Comments',
    icon: () => h(CommentOutlined),
    children: [
      {
        key: 'admin.comments.index',
        label: 'List',
        title: 'List',
        to: 'admin.comments.index'
      }
    ]
  },
  {
    key: 'admin.profile',
    label: 'Profile',
    title: 'Profile',
    icon: () => h(ProfileOutlined),
    to: 'admin.profile'
  }
]
