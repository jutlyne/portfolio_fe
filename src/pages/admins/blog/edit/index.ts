import { defineAsyncComponent, defineComponent, onBeforeMount, reactive, ref } from 'vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import { useRoute, useRouter } from 'vue-router'
import { getDetail, updateBlog } from '@/api/blog'
import { message } from 'ant-design-vue'
import type { TagInterface } from '@/interfaces/TagInterface'

export default defineComponent({
  components: {
    FormBlog: defineAsyncComponent(() => import('../_form/FormBlog.vue'))
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const fileUrl = ref<string | null>(null)
    const formState = reactive<CreateBlogInterface>({
      title: '',
      short_text: '',
      tags: [],
      body: '',
      image: ''
    })

    const blogId = route.params?.id as unknown as number

    const handleFinish = async () => {
      const { result, errorResult } = await updateBlog(blogId, formState)

      if (errorResult) {
        const errorData = errorResult.response.data
        message.error(errorData.messages || 'Failed')
      }

      if (result) {
        message.success(result.messages || 'Success')
        await router.push({ name: 'admin.blogs.index' })
      }
    }

    const getBlog = async () => {
      const blog = await getDetail(blogId)

      formState.body = blog.body
      formState.title = blog.title
      formState.short_text = blog.title
      fileUrl.value = blog.image

      blog.tag_resource.map((tag: TagInterface) => {
        return formState.tags.push(tag.id as number)
      })
    }

    onBeforeMount(getBlog)

    return {
      handleFinish,
      formState,
      fileUrl
    }
  }
})
