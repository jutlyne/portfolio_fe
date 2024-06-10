import { defineComponent, inject, onBeforeMount, ref, watch, type Ref } from 'vue'
import TimeLine from '@/components/users/time_line/TimeLine.vue'
import SkillHeader from '@/components/users/skill_header/SkillHeader.vue'
import NavHeader from '@/components/users/nav_header/NavHeader.vue'
import { getList } from '@/api/blog'
import { injectionKeys } from '@/constants/injectionKeys'
import PaginateItem from '@/components/users/paginate/PaginateItem.vue'
import { pageSize } from '@/constants/constant'
import paginationControls from '@/composables/paginationControls'
import { useRoute } from 'vue-router'

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
    const totalItem = inject<Ref<number>>(injectionKeys.totalItem)!
    const currentPage = inject<Ref<number>>(injectionKeys.currentPage)!
    const onPageChange = inject<Ref<any>>(injectionKeys.onPageChange)!
    const categories = inject<Ref<string[]>>(injectionKeys.categories)!
    const tagRef = inject<Ref<string>>(injectionKeys.skillTag)!

    const route = useRoute()
    const getTag = () => tagRef.value || ''

    const { setCategory, activePaginate } = paginationControls()
    setCategory(['All', 'PHP', 'NodeJs', 'VueJs', 'AWS', 'CICD', 'Life'])
    activePaginate(true)

    const fetchBlogData = async (limit: number, skip: number) => {
      isLoading.value = true

      try {
        currentPage.value = Math.floor(skip / limit) + 1

        const tag = getTag()
        const data = await getList({ limit, skip, tag })

        blogs.value = data.posts
        totalItem.value = data.total
      } finally {
        isLoading.value = false
      }
    }

    onBeforeMount(async () => {
      if (route.query?.ref) {
        currentPage.value = 1
        tagRef.value = ''
      }

      const skip = (currentPage.value - 1) * pageSize
      await fetchBlogData(pageSize, skip)
    })

    onPageChange.value = async (page: number, pageSize: number) => {
      const skip = pageSize * (page - 1)
      await fetchBlogData(pageSize, skip)
    }

    watch(tagRef, async () => {
      currentPage.value = 1
      await fetchBlogData(pageSize, 0)
    })

    return {
      categories,
      blogs,
      totalItem,
      currentPage
    }
  }
})
