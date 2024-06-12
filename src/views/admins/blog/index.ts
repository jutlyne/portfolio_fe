import { getProfile } from '@/api/auth'
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    onBeforeMount(async () => {
      const profile = await getProfile()

      console.log(profile)
    })
    return {}
  }
})
