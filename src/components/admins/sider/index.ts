import type { MenuEvent } from '@/interfaces/MenuInterface'
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter, type RouteRecordName } from 'vue-router'
import { menuItemAdmin } from '@/constants/constant'

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter()
    const route = useRoute()

    const collapsed = ref<boolean>(false)
    const selectedKeys = ref<(RouteRecordName | null | undefined)[]>([route.name])
    const openKeys = ref<string[]>([route.meta.routeParent as string])

    const logo = '/logo.svg'

    const handleSiderClick = async ({ item }: MenuEvent) => {
      await router.push({ name: item.to })
    }

    watch(route, () => {
      selectedKeys.value = [route.name]
    })

    return {
      selectedKeys,
      openKeys,
      menuItemAdmin,
      handleSiderClick,
      collapsed,
      logo
    }
  }
})
