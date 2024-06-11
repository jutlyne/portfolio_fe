// Base update state
import type { BlogStateInterace } from '@/interfaces/BlogInterface'

const setCurrentPage = (state: BlogStateInterace, payload: number) => {
  state.currentPage = payload
}

const setTagRef = (state: BlogStateInterace, payload: string) => {
  state.tagRef = payload
}

export default {
  setCurrentPage,
  setTagRef
}
