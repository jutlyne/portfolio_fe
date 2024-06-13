import { defineComponent, ref } from 'vue'
import ParticleItem from '@/components/users/particle/ParticleItem.vue'

export default defineComponent({
  components: {
    ParticleItem
  },
  setup() {
    const currentIndex = ref<number>(1)
    const direction = ref<number>(1)

    const startClassTransition = () => {
      const transition = () => {
        currentIndex.value += direction.value

        if (currentIndex.value > 4) {
          currentIndex.value = 1
        }

        setTimeout(() => {
          requestAnimationFrame(transition)
        }, 2000)
      }

      requestAnimationFrame(transition)
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
