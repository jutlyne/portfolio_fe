import { defineComponent, reactive } from 'vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import FormBlog from '../_form/FormBlog.vue'

export default defineComponent({
  components: {
    FormBlog
  },
  setup() {
    const formState = reactive<CreateBlogInterface>({
      title: '',
      short_text: '',
      tags: [],
      content: '',
      image: null
    })
    const handleFinish = () => {
      console.log(formState)
    }

    return {
      handleFinish,
      formState
    }
  }
})
