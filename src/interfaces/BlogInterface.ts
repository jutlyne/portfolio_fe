export interface BlogStateInterace {
  currentPage: number
  tagRef: string
}

export interface TablePaginateInterface {
  current: number
  pageSize: number
}

export interface DataItem {
  id: number | null
  body: string
  title: string
  userId: number
  views: string
  tags: string[]
}

export interface CreateBlogInterface {
  title: string
  short_text: string
  content: string
  tags: string[]
  image: File | string | null
}

export interface SearchStateInterface {
  title?: string
  tag?: string
  start_date?: string
  end_date?: string
}
