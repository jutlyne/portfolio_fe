import { defineComponent, inject, onBeforeMount, ref, type Ref } from 'vue'
import TimeLine from '@/components/users/time-line/TimeLine.vue'
import SkillHeader from '@/components/users/skill-header/SkillHeader.vue'
import NavHeader from '@/components/users/nav-header/NavHeader.vue'
import { getList } from '@/api/blog'
import { injectionKeys } from '@/constants/injectionKeys'
import PaginateItem from '@/components/users/paginate/PaginateItem.vue'
import { pageSize } from '@/constants/constant'

export default defineComponent({
  components: {
    TimeLine,
    SkillHeader,
    NavHeader,
    PaginateItem
  },
  setup() {
    const blogs = ref({})
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!
    const needPaginate = inject<Ref<boolean>>(injectionKeys.needPaginate)!
    const totalItem = inject<Ref<number>>(injectionKeys.totalItem)!
    const currentPage = inject<Ref<number>>(injectionKeys.currentPage)!
    const onPageChange = inject<Ref<any>>(injectionKeys.onPageChange)!
    const categories = inject<Ref<string[]>>(injectionKeys.categories)!

    categories.value = ['All', 'PHP', 'NodeJs', 'VueJs', 'AWS', 'CICD', 'Life']

    const fetchBlogData = async (limit: number, skip: number) => {
      try {
        needPaginate.value = true
        isLoading.value = true
        const data = await getList({ limit, skip })
        blogs.value = data.posts
        totalItem.value = data.total
        currentPage.value = ++data.skip
      } finally {
        isLoading.value = false
      }
    }
    onBeforeMount(async () => {
      await fetchBlogData(pageSize, 0)
    })

    onPageChange.value = async (page: number, pageSize: number) => {
      const skip = pageSize * (page - 1)
      await fetchBlogData(pageSize, skip)
    }

    return {
      categories,
      blogs,
      totalItem
    }
  }
})
