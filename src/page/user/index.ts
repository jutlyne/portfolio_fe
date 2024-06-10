import { defineComponent, provide, ref, type Ref } from 'vue'
import NavHeader from '@/components/users/nav_header/NavHeader.vue'
import FooterItem from '@/components/users/footer/FooterItem.vue'
import LoadingItem from '@/components/users/loading/LoadingItem.vue'
import { injectionKeys } from '@/constants/injectionKeys'
import PaginateItem from '@/components/users/paginate/PaginateItem.vue'
import SkillHeader from '@/components/users/skill_header/SkillHeader.vue'
import HotNotice from '@/components/users/hot_notice/HotNotice.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    NavHeader,
    FooterItem,
    LoadingItem,
    PaginateItem,
    SkillHeader,
    HotNotice
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
