import paginationControls from '@/composables/paginationControls'
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
  components: {
    ParticleItem: defineAsyncComponent(() =>
      import('@/components/users/particle/ParticleItem.vue')
    ),
    HomeTitleItem: defineAsyncComponent(() =>
      import('@/components/users/particle/ParticleItem.vue')
    ),
    ProfileItem: defineAsyncComponent(() =>
      import('@/components/users/profile/ProfileItem.vue')
    )
  },
  setup() {
    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    return {}
  }
})
