import { api } from '@/utils/axios'
import { safeRead } from '@/utils/safe'

export const getAllTags = async () => {
  return await safeRead(api.get('/admin/tags'))
}

export const getAllTagsByUser = async () => {
  return await safeRead(api.get('/tags'))
}
