import { defineComponent } from 'vue'
import { LineOutlined } from '@ant-design/icons-vue'
import paginationControls from '@/composables/paginationControls'
import { useRoute } from 'vue-router'
import { HttpStatusCode } from 'axios'
import { camelCaseToTitleCase, getEnumKeyByValue } from '@/utils/string'

export default defineComponent({
  components: {
    LineOutlined
  },
  setup() {
    const route = useRoute()
    const { setCategory, activePaginate } = paginationControls()
    setCategory([])
    activePaginate(false)

    const statusCode = route.params?.statusCode
    const statusCodeStr = getEnumKeyByValue(Number(statusCode), HttpStatusCode)
    const titleCase = camelCaseToTitleCase(String(statusCodeStr))

    return {
      titleCase,
      statusCode
    }
  }
})
