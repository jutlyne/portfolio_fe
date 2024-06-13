import HomeTitleItem from '@/components/users/home_title/HomeTitleItem.vue'
import ParticleItem from '@/components/users/particle/ParticleItem.vue'
import ProfileItem from '@/components/users/profile/ProfileItem.vue'
import paginationControls from '@/composables/paginationControls'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ParticleItem,
    HomeTitleItem,
    ProfileItem
  },
  setup() {
    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    return {}
  }
})
