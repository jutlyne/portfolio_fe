import type { AxiosRequestConfig } from 'axios'

export interface PaginateInterface extends AxiosRequestConfig {
  limit?: number
  skip?: number
}

export interface BlogQueryInterface extends Pick<PaginateInterface, 'skip' | 'limit'> {
  tag?: string
  title?: string
  q?: string
}
