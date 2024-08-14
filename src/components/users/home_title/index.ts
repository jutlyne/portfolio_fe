import { defineComponent, onMounted, ref } from 'vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  components: {
    AButton: Button
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

    onMounted(startClassTransition)

    return {
      currentIndex
    }
  }
})
