import { codeLanguage } from '@/constants/constant'
import { generateIdFromText } from './string'

export const processCodeBlocks = (copyCode: (event: { target: any }) => Promise<void>) => {
  const codeBlocks = document.querySelectorAll('pre > code[class^="language-"]')
  codeBlocks.forEach((codeBlock) => {
    const codeContent = codeBlock.textContent?.trim()

    const newCodeBlock = document.createElement('div')
    newCodeBlock.classList.add('codeBlock')

    const languageClass = Array.from(codeBlock.classList).find((className) =>
      className.startsWith('language-')
    )
    const language = languageClass ? languageClass.split('-')[1] : 'plaintext'
    const languageCodeDiv = document.createElement('div')
    languageCodeDiv.classList.add('languageCode')

    const languageText = () => {
      if (Object.prototype.hasOwnProperty.call(codeLanguage, language)) {
        return codeLanguage[language]
      } else {
        return language
      }
    }
    languageCodeDiv.textContent = languageText()

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

    tokenLineDiv.appendChild(spanElement)
    preElement.appendChild(tokenLineDiv)
    newCodeBlock.appendChild(languageCodeDiv)
    newCodeBlock.appendChild(copyButton)
    newCodeBlock.appendChild(preElement)

    codeBlock.parentElement?.replaceWith(newCodeBlock)
  })
}

export const processHeaders = () => {
  const headers = document.querySelectorAll('.prose h1, .prose h2, .prose h3')

  headers.forEach((header) => {
    const text = header.textContent?.replace(/🥈|🥇/g, '').trim()
    if (text) {
      const id = generateIdFromText(text)
      header.id = id
    }
  })
}
