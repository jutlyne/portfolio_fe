import { injectionKeys } from '@/constants/injectionKeys'
import { defineComponent, inject, type Ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!
    isLoading.value = false
    return {}
  }
})
