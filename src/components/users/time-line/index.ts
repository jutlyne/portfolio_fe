import { defineComponent } from 'vue'
import { RightOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    RightOutlined
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({})
    },
    totalData: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {}
  }
})
