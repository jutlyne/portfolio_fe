import { defineComponent } from 'vue'
import { ROUTE_TYPE } from '@/constants/constant'
import SiderItem from '@/components/admins/sider/SiderItem.vue'
import NavHeaderItem from '@/components/admins/nav_header/NavHeaderItem.vue'

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
