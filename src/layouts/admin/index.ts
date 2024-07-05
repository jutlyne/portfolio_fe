import { computed, defineComponent, provide, ref } from 'vue'
import { ROUTE_TYPE } from '@/constants/constant'
import SiderItem from '@/components/admins/sider/SiderItem.vue'
import NavHeaderItem from '@/components/admins/nav_header/NavHeaderItem.vue'
import { useRoute } from 'vue-router'
import LoadingItem from '@/components/users/loading/LoadingItem.vue'
import { injectionKeys } from '@/constants/injectionKeys'
import BreadcrumbItem from '@/components/admins/breadcrumb/BreadcrumbItem.vue'

export default defineComponent({
  components: {
    NavHeaderItem,
    SiderItem,
    LoadingItem,
    BreadcrumbItem
  },
  setup() {
    const isLoading = ref<boolean>(true)

    const route = useRoute()
    const isAuthRoute = computed(() => route.meta.routeType === ROUTE_TYPE.AUTH)

    provide(injectionKeys.isLoading, isLoading)

    return {
      isAuthRoute,
      isLoading
    }
  }
})
