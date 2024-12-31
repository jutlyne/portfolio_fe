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
  read_minutes: number
  body: string
  categories: number[]
  image: File | string | null
  anchors: BlogAnchorInterface[]
}

export interface SearchStateInterface {
  title?: string
  tag?: number
  start_date?: string
  end_date?: string
}

export interface BlogAnchorInterface {
  id: string | number
  href?: string
  title: string
  children?: BlogAnchorInterface[]
}

export interface BlogInfoInterface {
  name: string
  readtime: number
  created_at: string
}
