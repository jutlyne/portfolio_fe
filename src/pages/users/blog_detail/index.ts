import { getDetailBlogByUser, getListByUser } from '@/api/blog'
import AnchorItem from '@/components/users/anchor/AnchorItem.vue'
import BlogInfo from '@/components/users/blog_info/BlogInfo.vue'
import ProseItem from '@/components/users/prose/ProseItem.vue'
import RightScrollbar from '@/components/users/right_scrollbar/RightScrollbar.vue'
import paginationControls from '@/composables/paginationControls'
import { pageSizeRightbar } from '@/constants/constant'
import { injectionKeys } from '@/constants/injectionKeys'
import { anchorSample } from '@/constants/sample'
import type { BlogAnchorInterface } from '@/interfaces/BlogInterface'
import { LeftOutlined } from '@ant-design/icons-vue'
import { defineComponent, inject, onBeforeMount, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    LeftOutlined,
    RightScrollbar,
    AnchorItem,
    ProseItem,
    BlogInfo
  },
  setup() {
    const route = useRoute()
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!

    const blogId = ref<string>()
    const releatedBlogs = ref<Object[]>([])
    const anchor = ref<BlogAnchorInterface[]>([])

    const blogBody = ref<string>()

    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    const fetchBlogDetail = async (slug: string) => {
      isLoading.value = true
      window.scrollTo({
        top: 100,
        behavior: 'smooth'
      })
      try {
        const data = await getDetailBlogByUser(slug)
        blogBody.value = data.body

        anchor.value = anchorSample
        if (Object.keys(data).length !== 0) {
          const params = {
            tag: data.tag_resource[0].id,
            limit: pageSizeRightbar,
            skip: 0
          }
          releatedBlogs.value = (await getListByUser(params)).blogs
        }
      } finally {
        isLoading.value = false
      }
    }

    onBeforeMount(async () => {
      blogId.value = route.params?.id as unknown as string
      await fetchBlogDetail(blogId.value)
    })

    watch(route, async () => {
      const id = route.params?.id as unknown as string

      if (id != blogId.value) {
        blogId.value = id
        await fetchBlogDetail(id)
      }
    })

    return {
      releatedBlogs,
      anchor,
      blogBody
    }
  }
})
