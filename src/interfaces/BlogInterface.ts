export interface BlogStateInterace {
  currentPage: number
  tagRef: string
}

export interface TablePaginateInterface {
  current: number
  pageSize: number
}

export interface DataItem {
  key: string
  name: string
  age: number
  address: string
}
