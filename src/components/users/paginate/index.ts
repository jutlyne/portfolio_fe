import { pageSize } from '@/constants/constant'
import { defineComponent } from 'vue'

import { Pagination } from 'ant-design-vue'

export default defineComponent({
  components: {
    APagination: Pagination
  },
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
