import type { InputRuleInterface } from '@/interfaces/FormInterface'
import { type PropType, defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    formState: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rules: {
      type: Array as PropType<InputRuleInterface[]>,
      required: false
    }
  },
  setup() {
    return {}
  }
})
