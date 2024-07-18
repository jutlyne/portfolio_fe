import { injectionKeys } from '@/constants/injectionKeys'
import { Button } from 'ant-design-vue'
import type { TagInterface } from '@/interfaces/TagInterface'
import { defineComponent, inject, type PropType, type Ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    AButton: Button
  },
  props: {
    data: {
      type: Array as PropType<TagInterface[]>,
      default: () => [],
      required: true
    }
  },
  setup() {
    const store = useStore()
    const tagRef = inject<Ref<TagInterface | null>>(injectionKeys.skillTag)!

    const formatString = (str: string) => {
      if (!str) return

      return str.toLowerCase().replace(/\s+/g, '-')
    }

    const handleSkillClick = (tag: TagInterface) => {
      if (tag?.name == 'All') {
        tagRef.value = null
      } else {
        tagRef.value = tag
      }

      store.commit('blogs/setTagRef', tag)
    }

    const getTag = (): TagInterface => {
      return tagRef.value || store.state.blogs.tagRef
    }

    const getActiveClass = (id: number | null) => {
      let btnClass = ''
      const tag = getTag()
      if (tag.id == id) {
        btnClass = 'active'
      }

      return btnClass
    }

    return {
      handleSkillClick,
      store,
      formatString,
      getActiveClass
    }
  }
})
