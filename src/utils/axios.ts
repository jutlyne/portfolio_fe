import axios from 'axios'
import router from '@/router'
import { useCookies } from 'vue3-cookies'
import { validErrorStatus } from '@/constants/constant'
import { HttpStatusCode } from 'axios'
import { refreshToken } from '@/api/auth'
import { message } from 'ant-design-vue'

const baseApiUrl = import.meta.env.VITE_BASE_API_URL
const { cookies } = useCookies()

const getAccessToken = () => {
  const token = localStorage.getItem('adminAccessToken')
  const signature = cookies.get('adminAccessTokenSignature')
  return token && signature ? `${token}.${signature}` : ''
}

const getRefreshToken = () => {
  const token = localStorage.getItem('adminRefreshToken')
  const signature = cookies.get('adminRefreshTokenSignature')
  return token && signature ? `${token}.${signature}` : ''
}

const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${getAccessToken()}`
  }
})

const handleResponseError = async (error: { response: { status: number } }) => {
  const statusCode = error.response?.status ?? HttpStatusCode.InternalServerError

  if (validErrorStatus.includes(statusCode)) {
    await router.push({ name: 'error', params: { statusCode } })
  }

  if (statusCode === HttpStatusCode.Unauthorized) {
    const token = getRefreshToken()
    const { result, errorResult } = await refreshToken(token)
    if (result?.data?.token && result?.data?.refreshToken) {
      saveTokenInfo(result.data.token, result.data.refreshToken, true)
      return true
    }

    if (errorResult) {
      message.loading('Vui lòng đăng nhập lại!', 1.5).then(async () => {
        clearTokenInfo()
        await router.push({ name: 'admin.login' })
      })
    }
  }

  return Promise.reject(error)
}

const saveTokenInfo = (token: string, refreshToken: string, isRefresh = false) => {
  let expiresInDate = new Date()
  expiresInDate.setMonth(expiresInDate.getMonth() + 1)

  if (isRefresh) {
    expiresInDate = new Date(cookies.get('adminRefreshTokenExpiresIn'))
  }

  const [tokenHeader, tokenPayload, tokenSignature] = token.split('.')
  const [refreshTokenHeader, refreshTokenPayload, refreshTokenSignature] = refreshToken.split('.')

  if (tokenHeader && tokenPayload && tokenSignature) {
    localStorage.setItem('adminAccessToken', `${tokenHeader}.${tokenPayload}`)
    cookies.set('adminAccessTokenSignature', tokenSignature)
  }

  if (refreshTokenHeader && refreshTokenPayload && refreshTokenSignature) {
    localStorage.setItem('adminRefreshToken', `${refreshTokenHeader}.${refreshTokenPayload}`)
    cookies.set('adminRefreshTokenSignature', refreshTokenSignature, expiresInDate)
    cookies.set('adminRefreshTokenExpiresIn', expiresInDate.toString(), expiresInDate)
  }

  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

const clearTokenInfo = () => {
  localStorage.clear()
  cookies.keys().map((key: string) => {
    cookies.remove(key)
  })
}

api.interceptors.request.use((config) => config)

api.interceptors.response.use((response) => response, handleResponseError)

export { api, saveTokenInfo, clearTokenInfo }
