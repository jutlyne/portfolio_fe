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
    const readmoreActive = ref<boolean>(false)
    const targetOffset = ref<number>(100)

    const readmore = () => {
      readmoreActive.value = !readmoreActive.value
    }

    onMounted(() => {
      if (window.innerWidth >= 992) {
        targetOffset.value = 125
      }
    })

    return {
      targetOffset,
      readmore,
      readmoreActive
    }
  }
})
