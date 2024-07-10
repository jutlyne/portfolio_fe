import type { BlogAnchorInterface } from '@/interfaces/BlogInterface'
import { DoubleRightOutlined } from '@ant-design/icons-vue'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  components: {
    DoubleRightOutlined
  },
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
