import axios from 'axios'

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

export { api }
