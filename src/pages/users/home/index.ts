import paginationControls from '@/composables/paginationControls'
import ParticleItem from '@/components/users/particle/ParticleItem.vue'
import ProfileItem from '@/components/users/profile/ProfileItem.vue'
import HomeTitleItem from '@/components/users/home_title/HomeTitleItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ParticleItem,
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
