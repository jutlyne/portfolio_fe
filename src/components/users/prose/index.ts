import { defineComponent, onUpdated } from 'vue'

export default defineComponent({
  components: {},
  props: {
    body: {
      required: true
    }
  },
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

    onUpdated(() => {
      const codeBlocks = document.querySelectorAll('pre > code[class^="language-"]')
      codeBlocks.forEach((codeBlock) => {
        // Extract the text content from the <code> element
        const codeContent = codeBlock.textContent?.trim()

        // Create a new HTML structure
        const newCodeBlock = document.createElement('div')
        newCodeBlock.classList.add('codeBlock')

        const languageClass = Array.from(codeBlock.classList).find((className) =>
          className.startsWith('language-')
        )
        const language = languageClass ? languageClass.split('-')[1] : 'plaintext'
        const languageCodeDiv = document.createElement('div')
        languageCodeDiv.classList.add('languageCode')
        languageCodeDiv.textContent = language == 'plaintext' ? 'bash' : language

        const copyButton = document.createElement('button')
        copyButton.classList.add('copyCode')
        copyButton.textContent = 'Copy'
        copyButton.addEventListener('click', copyCode)

        const preElement = document.createElement('pre')
        preElement.classList.add('prism-code', 'language-bash', 'customScrollbar')

        const tokenLineDiv = document.createElement('div')
        tokenLineDiv.classList.add('token-line')
        tokenLineDiv.style.color = '#F8F8F2'

        const spanElement = document.createElement('span')
        spanElement.classList.add('token', 'plain')
        spanElement.textContent = codeContent || ''

        // Append elements to form the new structure
        tokenLineDiv.appendChild(spanElement)
        preElement.appendChild(tokenLineDiv)
        newCodeBlock.appendChild(languageCodeDiv)
        newCodeBlock.appendChild(copyButton)
        newCodeBlock.appendChild(preElement)

        // Replace the old <pre> element with the new structure
        codeBlock.parentElement?.replaceWith(newCodeBlock)
      })
    })

    return { copyCode }
  }
})
