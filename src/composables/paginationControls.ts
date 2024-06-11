import { injectionKeys } from '@/constants/injectionKeys'
import { inject, type Ref } from 'vue'

export default function paginationControls() {
  const needPaginate = inject<Ref<boolean>>(injectionKeys.needPaginate)!
  const categories = inject<Ref<string[]>>(injectionKeys.categories)!

  function activePaginate(active = false) {
    needPaginate.value = active
  }

  function setCategory(cat: string[]) {
    categories.value = cat
  }

  return { activePaginate, setCategory }
}
