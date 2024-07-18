import type { TagInterface } from '@/interfaces/TagInterface'
import { api } from '@/utils/axios'
import { safe, safeRead } from '@/utils/safe'

export const getAllTags = async () => {
  return await safeRead(api.get('/admin/tags'))
}

export const getAllTagsByUser = async () => {
  return await safeRead(api.get('/tags'))
}

export const store = async (data: TagInterface) => {
  return await safe(api.post('/admin/tags', data))
}

export const updatePatch = async (data: TagInterface, id: number) => {
  return await safe(
    api.patch('/admin/tags/' + id, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  )
}

export const deleteTag = async (id: number) => {
  return await safe(api.delete('/admin/tags/' + id))
}
