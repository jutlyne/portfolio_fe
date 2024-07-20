import paginationControls from '@/composables/paginationControls'
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
  components: {
    LazyParticleItem: defineAsyncComponent({
      loader: () => import('@/components/users/particle/ParticleItem.vue'),
      delay: 500,
    }),
    LazyProfileItem: defineAsyncComponent(() => import('@/components/users/profile/ProfileItem.vue')),
    LazyHomeTitleItem: defineAsyncComponent(() => import('@/components/users/home_title/HomeTitleItem.vue'))
  },
  setup() {
    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    return {}
  }
})
