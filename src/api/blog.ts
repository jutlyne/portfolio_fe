import type { BlogQueryInterface } from '@/interfaces/QueryInterface'
import { api } from '@/utils/axios'
import { safeRead } from '@/utils/safe'

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
