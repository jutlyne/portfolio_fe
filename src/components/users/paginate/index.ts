import { pageSize } from '@/constants/constant'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    onPageChange: {
      required: true
    }
  },
  setup() {
    return {
      pageSize
    }
  }
})
