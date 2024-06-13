import { computed, defineComponent } from 'vue'
import { ROUTE_TYPE } from '@/constants/constant'
import SiderItem from '@/components/admins/sider/SiderItem.vue'
import NavHeaderItem from '@/components/admins/nav_header/NavHeaderItem.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    NavHeaderItem,
    SiderItem
  },
  setup() {
    const route = useRoute()
    const isAuthRoute = computed(() => route.meta.routeType === ROUTE_TYPE.AUTH)

    return {
      isAuthRoute
    }
  }
})
