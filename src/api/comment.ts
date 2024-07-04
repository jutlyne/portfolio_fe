import type { StoreCommentInterface } from '@/interfaces/CommentInterface'
import type { PaginateInterface } from '@/interfaces/QueryInterface'
import { api } from '@/utils/axios'
import { safe, safeRead } from '@/utils/safe'

export const getList = async (params?: PaginateInterface) => {
  return await safeRead(
    api.get('/comments', {
      params
    })
  )
}

export const addComment = async (params: StoreCommentInterface) => {
  return await safe(api.post('/comments/add', params))
}

export const deleteComment = async (id: number) => {
  return await safe(api.delete('/comments/' + id))
}
