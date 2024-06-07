import type { AxiosRequestConfig } from 'axios'

export interface PaginateInterface extends AxiosRequestConfig {
  limit?: number
  skip?: number
}
