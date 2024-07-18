import { injectionKeys } from '@/constants/injectionKeys'
import { Button } from 'ant-design-vue'
import { defineComponent, inject, type PropType, type Ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    AButton: Button
  },
  props: {
    data: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const tagRef = inject<Ref<string | null>>(injectionKeys.skillTag)!

    const formatString = (str: string) => {
      return str.toLowerCase().replace(/\s+/g, '-')
    }

    const handleSkillClick = (skill?: string) => {
      let tag = null
      if (skill && skill !== 'All') {
        tag = formatString(skill)
      }

      tagRef.value = tag
      store.commit('blogs/setTagRef', tag)
    }

    const getTag = () => {
      return tagRef.value || store.state.blogs.tagRef || ''
    }

    const getActiveClass = (str: string) => {
      return formatString(str) == getTag() || (formatString(str) == 'all' && !getTag())
        ? 'active'
        : ''
    }

    return {
      handleSkillClick,
      store,
      formatString,
      getActiveClass
    }
  }
})
