import ParticleItem from '@/components/users/particle/ParticleItem.vue'
import paginationControls from '@/composables/paginationControls'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    ParticleItem
  },
  setup() {
    const currentIndex = ref<number>(1)
    const direction = ref<number>(1)

    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    const startClassTransition = () => {
      setInterval(() => {
        currentIndex.value += direction.value

        if (currentIndex.value > 4) {
          currentIndex.value = 4
          direction.value = -1
        } else if (currentIndex.value < 1) {
          currentIndex.value = 1
          direction.value = 1
        }
      }, 1000)
    }

    const blankUrl = (url: string) => {
      window.open(url, '_blank')
    }

    startClassTransition()

    return {
      currentIndex,
      blankUrl
    }
  }
})
