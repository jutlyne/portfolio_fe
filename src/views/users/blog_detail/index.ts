import { getDetail, getListByTag } from '@/api/blog'
import RightScrollbar from '@/components/users/right_scrollbar/RightScrollbar.vue'
import paginationControls from '@/composables/paginationControls'
import { injectionKeys } from '@/constants/injectionKeys'
import { LeftOutlined } from '@ant-design/icons-vue'
import { defineComponent, inject, onBeforeMount, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    LeftOutlined,
    RightScrollbar
  },
  setup() {
    const route = useRoute()
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!

    const releatedBlogs = ref<Object[]>([])
    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    const fetchBlogDetail = async (id: number) => {
      isLoading.value = true

      try {
        const data = await getDetail(id)
        releatedBlogs.value = (await getListByTag(data.tags)).posts
      } finally {
        isLoading.value = false
      }
    }

    onBeforeMount(async () => {
      const id = route.params?.id as unknown as number
      await fetchBlogDetail(id)
    })

    watch(route, async () => {
      const id = route.params?.id as unknown as number
      await fetchBlogDetail(id)
    })

    return {
      releatedBlogs
    }
  }
})
