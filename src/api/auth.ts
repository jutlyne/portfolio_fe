import type { FormLoginStateInterface } from '@/interfaces/FormInterface'
import { api } from '@/utils/axios'
import { safe, safeRead } from '@/utils/safe'

export const login = async (params: FormLoginStateInterface) => {
  return await safe(
    api.post('/admin/login', {
      ...params,
      expiresInMins: 1
    })
  )
}

export const getProfile = async () => {
  return await safeRead(api.get('/admin/me'))
}

export const refreshToken = async (refreshToken: string) => {
  return await safe(api.post('/admin/refresh-token', { refresh_token: refreshToken }))
}
