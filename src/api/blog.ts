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

export const getListByUser = async (params: BlogQueryInterface) => {
  return await safeRead(
    api.get('/blogs', {
      params
    })
  )
}
