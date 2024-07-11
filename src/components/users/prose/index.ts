import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const buttonCopy = ref<string>('Copy')

    const copyCode = async (event: { target: any }) => {
      if (event.target.classList.contains('copyCode')) {
        const button = event.target
        const codeBlock = button.closest('.codeBlock')
        const codeSnippet = codeBlock.querySelector('.token-line').textContent.trim()

        buttonCopy.value = 'Copied'
        await navigator.clipboard.writeText(codeSnippet)
        setTimeout(() => {
          buttonCopy.value = 'Copy'
        }, 1000)
      }
    }

    onMounted(() => {
      const copyButtons = document.querySelectorAll('.copyCode')
      copyButtons.forEach((button) => {
        button.addEventListener('click', copyCode)
      })
    })

    return { copyCode, buttonCopy }
  }
})
