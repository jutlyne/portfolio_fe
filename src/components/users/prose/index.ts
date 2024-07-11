import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const copyCode = async (event: { target: any }) => {
      if (event.target.classList.contains('copyCode')) {
        const button = event.target
        const codeBlock = button.closest('.codeBlock')
        const codeSnippet = codeBlock.querySelector('.token-line').textContent.trim()
        button.textContent = 'Copied'
        await navigator.clipboard.writeText(codeSnippet)
        setTimeout(() => {
          button.textContent = 'Copy'
        }, 1500)
      }
    }

    onMounted(() => {
      const copyButtons = document.querySelectorAll('.copyCode')
      copyButtons.forEach((button) => {
        button.addEventListener('click', copyCode)
      })
    })

    return { copyCode }
  }
})
