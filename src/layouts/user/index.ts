import { defineAsyncComponent, defineComponent, provide, ref, type Ref } from 'vue'
import { injectionKeys } from '@/constants/injectionKeys'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    NavHeader: defineAsyncComponent(() =>
      import('@/components/users/nav_header/NavHeader.vue')
    ),
    FooterItem: defineAsyncComponent(() =>
      import('@/components/users/footer/FooterItem.vue')
    ),
    LoadingItem: defineAsyncComponent(() =>
      import('@/components/users/loading/LoadingItem.vue')
    ),
    PaginateItem: defineAsyncComponent(() =>
      import('@/components/users/paginate/PaginateItem.vue')
    ),
    SkillHeader: defineAsyncComponent(() =>
      import('@/components/users/skill_header/SkillHeader.vue')
    ),
    HotNotice: defineAsyncComponent(() =>
      import('@/components/users/hot_notice/HotNotice.vue')
    )
  },
  setup() {
    const isLoading = ref<boolean>(false)
    const needPaginate = ref<boolean>(false)
    const totalItem = ref<number>(0)
    const categories = ref<string[]>([])
    const skillTag = ref<string>('')
    const onPageChange: Ref<() => void> = ref(() => {})

    const store = useStore()

    provide(injectionKeys.isLoading, isLoading)
    provide(injectionKeys.needPaginate, needPaginate)
    provide(injectionKeys.totalItem, totalItem)
    provide(injectionKeys.onPageChange, onPageChange)
    provide(injectionKeys.categories, categories)
    provide(injectionKeys.skillTag, skillTag)

    return {
      isLoading,
      needPaginate,
      totalItem,
      onPageChange,
      categories,
      store
    }
  }
})
