import axios from 'axios'
import router from '@/router' // import Vue Router
import { useCookies } from 'vue3-cookies'

const baseApiUrl = import.meta.env.VITE_BASE_API_URL
const { cookies } = useCookies()

const headerPayload = localStorage.getItem('adminAccessToken')
const signature = cookies.get('adminSignature')

const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${headerPayload}.${signature}`
  }
})

api.interceptors.request.use(function (config) {
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error', error)

    if (error.response?.status == 404) {
      router.push({ name: '404' })
    } else {
      router.push({ name: '500' })
    }

    return Promise.reject(error)
  }
)

export { api }
