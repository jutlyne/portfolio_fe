import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import type { BlogQueryInterface } from '@/interfaces/QueryInterface'
import { api } from '@/utils/axios'
import { safe, safeRead } from '@/utils/safe'

export const getList = async (params?: BlogQueryInterface) => {
  return await safeRead(
    api.get('/posts', {
      params
    })
  )
}

export const getDetail = async (id: number) => {
  return await safeRead(api.get('/posts/' + id))
}

export const getListByTag = async (tags: string[], limit = 16) => {
  return await safeRead(
    api.get('/posts/tag/' + tags[0], {
      params: {
        limit
      }
    })
  )
}

export const addBlog = async (params: CreateBlogInterface) => {
  return await safe(api.post('/posts/add', params))
}

export const deleteBlog = async (id: number) => {
  return await safe(api.delete(`/posts/${id}`))
}
