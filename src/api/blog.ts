import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import type { BlogQueryInterface } from '@/interfaces/QueryInterface'
import { api } from '@/utils/axios'
import { safe, safeRead } from '@/utils/safe'

export const getList = async (params?: BlogQueryInterface) => {
  return await safeRead(
    api.get('/admin/blogs', {
      params
    })
  )
}

export const getDetail = async (id: number) => {
  return await safeRead(api.get('/admin/blogs/' + id))
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
  return await safe(api.post('/admin/blogs', params))
}

export const updateBlog = async (id: number, params: CreateBlogInterface) => {
  return await safe(
    api.post('/admin/blogs/' + id, {
      ...params,
      _method: 'PUT'
    })
  )
}

export const deleteBlog = async (id: number) => {
  return await safe(api.delete(`/admin/blogs/${id}`))
}

export const getDetailBlogByUser = async (slug: string) => {
  return await safeRead(api.get('/blogs/' + slug))
}
