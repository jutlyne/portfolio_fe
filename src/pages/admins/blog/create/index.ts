import { defineAsyncComponent, defineComponent, reactive } from 'vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'

export default defineComponent({
  components: {
    FormBlog: defineAsyncComponent(() =>
      import('../_form/FormBlog.vue')
    )
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
