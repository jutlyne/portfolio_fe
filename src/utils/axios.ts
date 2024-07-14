import axios from 'axios'
import router from '@/router'
import { useCookies } from 'vue3-cookies'
import { validErrorStatus } from '@/constants/constant'
import { HttpStatusCode } from 'axios'
import { refreshToken } from '@/api/auth'
import { message } from 'ant-design-vue'

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const baseApiUrl = import.meta.env.VITE_BASE_API_URL
const { cookies } = useCookies()

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token))
  refreshSubscribers = []
}
const addRefreshSubscriber = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb)
}

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

const handleResponseError = async (error: { response: { status: number }; config: any }) => {
  const { config } = error
  const statusCode = error.response?.status ?? HttpStatusCode.InternalServerError

  if (validErrorStatus.includes(statusCode)) {
    await router.push({ name: 'error', params: { statusCode } })
  }

  if (statusCode == HttpStatusCode.Unauthorized && !config._retry) {
    if (!isRefreshing) {
      isRefreshing = true
      config._retry = true

      const token = getRefreshToken()
      const { result, errorResult } = await refreshToken(token)
      if (result?.data?.token && result?.data?.refreshToken) {
        saveTokenInfo(result.data.token, result.data.refreshToken, config, true)
        onRefreshed(result.data.token)
        return true
      }

      if (errorResult) {
        message.loading('Vui lòng đăng nhập lại!', 1.5).then(async () => {
          clearTokenInfo()
          await router.push({ name: 'admin.login' })
        })
      }
    } else {
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          config.headers['Authorization'] = `Bearer ${token}`
          resolve(api(config))
        })
      })
    }
  }

  return Promise.reject(error)
}

const saveTokenInfo = (token: string, refreshToken: string, config?: any, isRefresh = false) => {
  let expiresInDate = new Date()
  expiresInDate.setMonth(expiresInDate.getMonth() + 1)

  if (isRefresh) {
    expiresInDate = new Date(cookies.get('adminRefreshTokenExpiresIn'))
  }

  setTokenInStorage(token, 'adminAccessToken', 'adminAccessTokenSignature')
  setTokenInStorage(refreshToken, 'adminRefreshToken', 'adminRefreshTokenSignature', expiresInDate)
  cookies.set('adminRefreshTokenExpiresIn', expiresInDate.toString(), expiresInDate)

  api.defaults.headers['Authorization'] = `Bearer ${token}`

  if (config) {
    config.headers['Authorization'] = `Bearer ${token}`
    api(config)
  }
}

const setTokenInStorage = (
  tokenPart: string,
  localStorageKey: string,
  cookieKey: string,
  cookieExpiryDate?: Date
) => {
  const [header, payload, signature] = tokenPart.split('.')
  if (header && payload && signature) {
    localStorage.setItem(localStorageKey, `${header}.${payload}`)
    cookies.set(cookieKey, signature, cookieExpiryDate)
  }
}

const clearTokenInfo = () => {
  localStorage.clear()
  cookies.keys().map((key: string) => {
    cookies.remove(key)
  })
}

api.interceptors.request.use((config) => config)

api.interceptors.response.use((response) => response, handleResponseError)

export { api, saveTokenInfo, clearTokenInfo, axios }
