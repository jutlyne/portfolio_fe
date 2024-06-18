import { defineComponent, reactive } from 'vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import { useRouter } from 'vue-router'
import FormBlog from '../_form/FormBlog.vue'

export default defineComponent({
  components: {
    FormBlog
  },
  setup() {
    const router = useRouter()
    const formState = reactive<CreateBlogInterface>({
      title: '',
      short_text: '',
      tags: [],
      content: '',
      image: null
    })
    const handleFinish = () => {
      console.log(formState)
      // router.push({ name: 'admin.blog.index' })
    }

    return {
      handleFinish,
      formState
    }
  }
})
