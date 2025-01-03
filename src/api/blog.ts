import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import type { BlogQueryInterface } from '@/interfaces/QueryInterface'
import { api } from '@/utils/axios'
import { safe, safeRead } from '@/utils/safe'

export const getList = async (params?: BlogQueryInterface) => {
  return await safeRead(
    api.get('/blog', {
      params
    })
  )
}

export const getDetail = async (id: string) => {
  return await safeRead(api.get('/blog/' + id))
}

export const addBlog = async (params: CreateBlogInterface) => {
  return await safe(
    api.post('/blog', params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  )
}

export const updateBlog = async (id: number, params: CreateBlogInterface) => {
  return await safe(
    api.post('/blog/' + id, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  )
}

export const deleteBlog = async (id: number) => {
  return await safe(api.delete(`/admin/blogs/${id}`))
}
