import type { BlogAnchorInterface } from '@/interfaces/BlogInterface'
import { DoubleRightOutlined } from '@ant-design/icons-vue'
import { defineComponent, onMounted, ref, type PropType } from 'vue'

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
    const targetOffset = ref<number | undefined>(undefined)
    onMounted(() => {
      targetOffset.value = window.innerHeight / 10
    })

    return {
      targetOffset
    }
  }
})
