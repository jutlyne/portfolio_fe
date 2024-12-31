import type { FormLoginStateInterface } from '@/interfaces/FormInterface'
import { api } from '@/utils/axios'
import { safe, safeRead } from '@/utils/safe'

export const login = async (params: FormLoginStateInterface) => {
  return await safe(api.post('/auth/login', params))
}

export const getProfile = async () => {
  return await safeRead(api.get('/auth/profile'))
}

export const refreshToken = async (refreshToken: string) => {
  return await safe(api.post('/admin/refresh-token', { refresh_token: refreshToken }))
}
