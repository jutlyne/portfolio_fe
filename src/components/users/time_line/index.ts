import { defineComponent } from 'vue'
import { RightOutlined } from '@ant-design/icons-vue'
import { Timeline } from 'ant-design-vue'

export default defineComponent({
  components: {
    RightOutlined,
    ATimeline: Timeline,
    ATimelineItem: Timeline.Item
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({})
    },
    totalData: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {}
  }
})
