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
  body: string
  tags: number[]
  image: File | string | null
  headings: BlogAnchorInterface[]
}

export interface SearchStateInterface {
  title?: string
  tag?: number
  start_date?: string
  end_date?: string
}

export interface BlogAnchorInterface {
  key: string | number
  href?: string
  title: string
  children?: BlogAnchorInterface[]
}
