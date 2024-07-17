import { defineComponent, provide, ref, type Ref } from 'vue'
import { injectionKeys } from '@/constants/injectionKeys'
import FooterItem from '@/components/users/footer/FooterItem.vue'
import HotNotice from '@/components/users/hot_notice/HotNotice.vue'
import { useStore } from 'vuex'
import NavHeader from '@/components/users/nav_header/NavHeader.vue'
import LoadingItem from '@/components/users/loading/LoadingItem.vue'
import PaginateItem from '@/components/users/paginate/PaginateItem.vue'
import SkillHeader from '@/components/users/skill_header/SkillHeader.vue'
import type { TagInterface } from '@/interfaces/TagInterface'

export default defineComponent({
  components: {
    HotNotice,
    FooterItem,
    NavHeader,
    LoadingItem,
    PaginateItem,
    SkillHeader
  },
  setup() {
    const isLoading = ref<boolean>(false)
    const needPaginate = ref<boolean>(false)
    const totalItem = ref<number>(0)
    const categories = ref<TagInterface[]>([])
    const skillTag = ref<string>('')
    const onPageChange: Ref<(...agrs: any) => Promise<void>> = ref(async () => {})

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
