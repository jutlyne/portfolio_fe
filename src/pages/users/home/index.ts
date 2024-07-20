import paginationControls from '@/composables/paginationControls'
import HomeTitleItem from '@/components/users/home_title/HomeTitleItem.vue'
import ProfileItem from '@/components/users/profile/ProfileItem.vue'
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
  components: {
    LazyParticleItem: defineAsyncComponent({
      loader: () => import('@/components/users/particle/ParticleItem.vue'),
      delay: 500,
    }),
    ProfileItem,
    HomeTitleItem
  },
  setup() {
    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    return {}
  }
})
