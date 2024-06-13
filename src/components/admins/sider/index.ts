import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const selectedKeys2 = ref<string[]>(['1'])
    const openKeys = ref<string[]>(['sub1'])
    return {
      selectedKeys2,
      openKeys
    }
  }
})
