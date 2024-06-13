import axios from 'axios'
import router from '@/router' // import Vue Router
import { useCookies } from 'vue3-cookies'
import { validErrorStatus } from '@/constants/constant'

const baseApiUrl = import.meta.env.VITE_BASE_API_URL
const { cookies } = useCookies()

const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('adminAccessToken')}.${cookies.get('adminSignature')}`
  }
})

api.interceptors.request.use(function (config) {
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status ?? 500
    if (validErrorStatus.includes(statusCode)) {
      router.push({ name: 'error', params: { statusCode } })
    }

    return Promise.reject(error)
  }
)

export { api }
