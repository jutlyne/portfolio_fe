import { injectionKeys } from '@/constants/injectionKeys';
import { defineComponent, inject, type Ref } from 'vue'

export default defineComponent({
  components: {},
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup() {
    const skillTag = inject<Ref<string | null>>(injectionKeys.skillTag)!

    const formatString = (str: string) => {
      return str.toLowerCase().replace(/\s+/g, '-');
    };

    const handleSkillClick = (skill: string) => {
      let tag = null
      if (skill !== 'All') {
        tag = formatString(skill)
      }
      skillTag.value = tag
    };
    return {
      handleSkillClick,
      skillTag
    }
  }
})
