import type { PaginateInterface } from '@/interfaces/QueryInterface'
import { api } from '@/utils/axios'
import { safeRead } from '@/utils/safe'

export const getList = async (params?: PaginateInterface) => {
  return await safeRead(
    api.get('/posts', {
      params
    })
  )
}
