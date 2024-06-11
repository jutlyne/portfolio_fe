import { defineComponent } from 'vue'
import { LineOutlined } from '@ant-design/icons-vue'
import paginationControls from '@/composables/paginationControls'

export default defineComponent({
  components: {
    LineOutlined
  },
  setup() {
    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    return {}
  }
})
