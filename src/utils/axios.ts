import axios from 'axios'
import router from '@/router' // import Vue Router

const baseApiUrl = import.meta.env.VITE_BASE_API_URL

const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    Accept: 'application/json'
  }
})

api.interceptors.request.use(function (config) {
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)

    if (error.response?.status == 404) {
      router.replace({ name: '404' })
    }
    return Promise.reject(error)
  }
)

export { api }
