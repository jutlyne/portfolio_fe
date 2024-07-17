import { defineAsyncComponent, defineComponent, reactive } from 'vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import { addBlog } from '@/api/blog'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    FormBlog: defineAsyncComponent(() =>
      import('../_form/FormBlog.vue')
    )
  },
  setup() {
    const router = useRouter()
    const formState = reactive<CreateBlogInterface>({
      title: '',
      short_text: '',
      tags: [],
      body: '',
      image: null,
      headings: []
    })

    const handleFinish = async () => {
      const { result, errorResult } = await addBlog(formState)

      if (errorResult) {
        const errorData = errorResult.response.data
        message.error(errorData.messages || 'Failed')
      }

      if (result) {
        message.success(result.messages || 'Success')
        await router.push({ name: 'admin.blogs.index' })
      }
    }

    return {
      handleFinish,
      formState
    }
  }
})
