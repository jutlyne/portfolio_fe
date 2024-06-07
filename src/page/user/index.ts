import { defineComponent, provide, ref, type Ref } from 'vue'
import NavHeader from '@/components/users/nav-header/NavHeader.vue'
import FooterItem from '@/components/users/footer/FooterItem.vue'
import LoadingItem from '@/components/users/loading/LoadingItem.vue'
import { injectionKeys } from '@/constants/injectionKeys'
import PaginateItem from '@/components/users/paginate/PaginateItem.vue'

export default defineComponent({
  components: {
    NavHeader,
    FooterItem,
    LoadingItem,
    PaginateItem
  },
  setup() {
    const isLoading = ref<boolean>(true)
    const needPaginate = ref<boolean>(false)
    const totalItem = ref<number>(0)
    const currentPage = ref<number>(1)
    const onPageChange: Ref<() => void> = ref(() => {
      console.log(123)
    })

    provide(injectionKeys.isLoading, isLoading)
    provide(injectionKeys.needPaginate, needPaginate)
    provide(injectionKeys.totalItem, totalItem)
    provide(injectionKeys.currentPage, currentPage)
    provide(injectionKeys.onPageChange, onPageChange)

    return {
      isLoading,
      needPaginate,
      totalItem,
      currentPage,
      onPageChange
    }
  }
})
