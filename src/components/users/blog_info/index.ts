import type { BlogInfoInterface } from '@/interfaces/BlogInterface'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  components: {},
  props: {
    blogInfo: {
      type: Object as PropType<BlogInfoInterface | undefined>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
