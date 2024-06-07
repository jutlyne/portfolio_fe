import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    onPageChange: {
      required: true
    }
  },
  setup() {
    return {}
  }
})
