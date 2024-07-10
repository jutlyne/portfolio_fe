import type { BlogAnchorInterface } from '@/interfaces/BlogInterface'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  components: {},
  props: {
    items: {
      type: Array as PropType<BlogAnchorInterface[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
