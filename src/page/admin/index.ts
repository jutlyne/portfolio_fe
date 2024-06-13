import { defineComponent } from 'vue'
import NavHeaderItem from '@/components/admins/nav_header/NavHeaderItem.vue'
import SiderItem from '@/components/admins/sider/SiderItem.vue'
import { ROUTE_TYPE } from '@/constants/constant'

export default defineComponent({
  components: {
    NavHeaderItem,
    SiderItem
  },
  setup() {
    const routeType = ROUTE_TYPE
    return {
      routeType
    }
  }
})
