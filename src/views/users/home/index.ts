import ParticleItem from '@/components/users/particle/ParticleItem.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    ParticleItem
  },
  setup() {
    const currentIndex = ref<number>(1)
    const direction = ref<number>(1)

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

    startClassTransition()

    return {
      currentIndex
    }
  }
})
