import { injectionKeys } from '@/constants/injectionKeys'
import { defineComponent, inject, type PropType, type Ref } from 'vue'

export default defineComponent({
  components: {},
  props: {
    data: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup() {
    const skillTag = inject<Ref<string | null>>(injectionKeys.skillTag)!

    const formatString = (str: string) => {
      return str.toLowerCase().replace(/\s+/g, '-')
    }

    const handleSkillClick = (skill?: string) => {
      let tag = null
      if (skill && skill !== 'All') {
        tag = formatString(skill)
      }
      skillTag.value = tag
    }

    const getActiveClass = (str: string) => {
      return formatString(str) == skillTag.value || (formatString(str) == 'all' && !skillTag.value)
        ? 'active'
        : ''
    }

    return {
      handleSkillClick,
      skillTag,
      formatString,
      getActiveClass
    }
  }
})
