import type { h } from 'vue'

export type MenuEvent = {
  key: string
  item: {
    to?: string
    [key: string]: string | undefined
  }
  keyPath: string[]
}

export type MenuItem = {
  key: string
  icon?: () => ReturnType<typeof h>
  label?: string
  title: string
  to?: string
  url?: string
  children?: MenuItem[]
}
