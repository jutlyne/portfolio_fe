import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import blogs from './modules/blogs'
import type { BlogStateInterace } from '@/interfaces/BlogInterface'

export interface State extends BlogStateInterace {}

export const store = createStore<State>({
  modules: {
    blogs
  },
  plugins: [createPersistedState()]
})
