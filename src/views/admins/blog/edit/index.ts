import { defineComponent, onBeforeMount, reactive, ref } from 'vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import { useRoute } from 'vue-router'
import FormBlog from '../_form/FormBlog.vue'
import { getDetail } from '@/api/blog'

export default defineComponent({
  components: {
    FormBlog
  },
  setup() {
    const route = useRoute()
    const fileUrl = ref<string | null>(null)
    const formState = reactive<CreateBlogInterface>({
      title: '',
      short_text: '',
      tags: [],
      content: '',
      image: ''
    })
    const handleFinish = () => {
      console.log(formState)
    }

    const getBlog = async () => {
      const blog = await getDetail(route.params?.id as unknown as number)
      formState.content = blog.body
      formState.title = blog.title
      formState.tags = blog.tags
      formState.short_text = blog.title
      fileUrl.value = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }

    onBeforeMount(getBlog)

    return {
      handleFinish,
      formState,
      fileUrl
    }
  }
})
