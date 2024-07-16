import { injectionKeys } from '@/constants/injectionKeys'
import type { TagInterface } from '@/interfaces/TagInterface'
import { inject, type Ref } from 'vue'

export default function paginationControls() {
  const needPaginate = inject<Ref<boolean>>(injectionKeys.needPaginate)!
  const categories = inject<Ref<TagInterface[]>>(injectionKeys.categories)!

  function activePaginate(active = false) {
    needPaginate.value = active
  }

  function setCategory(cat: TagInterface[]) {
    categories.value = cat
  }

  return { activePaginate, setCategory }
}
