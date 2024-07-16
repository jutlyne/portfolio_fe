import { defineComponent, onBeforeMount, ref, toRefs, type PropType } from 'vue'
import { getAllTags } from '@/api/tag'
import type { TagInterface } from '@/interfaces/TagInterface'
import type { SearchStateInterface } from '@/interfaces/BlogInterface'

import { Input, Select, RangePicker, Form, Button } from 'ant-design-vue'

export default defineComponent({
  components: {
    AInput: Input,
    ASelect: Select,
    ARangePicker: RangePicker,
    AForm: Form,
    AButton: Button
  },
  props: {
    searchState: {
      type: Object as PropType<SearchStateInterface>,
      required: true
    },
    handleSearch: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const { searchState } = toRefs(props)
    const treeData = ref([])

    const fetchAllTag = async () => {
      const tagResponse = await getAllTags()
      treeData.value = tagResponse.map((tag: TagInterface) => {
        return {
          label: tag.name,
          value: tag.id
        }
      })
    }

    const onRangeChange = (_value: [string, string], [startDate, endDate]: [string, string]) => {
      searchState.value.start_date = startDate
      searchState.value.end_date = endDate
    }

    onBeforeMount(fetchAllTag)

    return {
      treeData,
      onRangeChange
    }
  }
})
