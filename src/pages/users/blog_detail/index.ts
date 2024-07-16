import { getDetailBlogByUser, getListByTag } from '@/api/blog'
import AnchorItem from '@/components/users/anchor/AnchorItem.vue'
import BlogInfo from '@/components/users/blog_info/BlogInfo.vue'
import ProseItem from '@/components/users/prose/ProseItem.vue'
import RightScrollbar from '@/components/users/right_scrollbar/RightScrollbar.vue'
import paginationControls from '@/composables/paginationControls'
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

    const blogId = ref<number>()
    const releatedBlogs = ref<Object[]>([])
    const anchor = ref<BlogAnchorInterface[]>([])

    const blogBody = ref<string>()

    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    const fetchBlogDetail = async (id: number) => {
      isLoading.value = true
      window.scrollTo({
        top: 100,
        behavior: 'smooth'
      })
      try {
        const data = await getDetailBlogByUser(
          'huong-dan-full-deploy-website-nextjs-hoac-nodejs-len-vps-1721103044'
        )
        blogBody.value = data.body
        console.log(data)

        anchor.value = anchorSample
        // if (Object.keys(data).length !== 0) {
        //   releatedBlogs.value = (await getListByTag(data.tags)).posts
        // }
      } finally {
        isLoading.value = false
      }
    }

    onBeforeMount(async () => {
      blogId.value = route.params?.id as unknown as number
      await fetchBlogDetail(blogId.value)
    })

    watch(route, async () => {
      const id = route.params?.id as unknown as number

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
