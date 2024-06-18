import paginationControls from '@/composables/paginationControls'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    return {}
  }
})
