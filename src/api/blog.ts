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
