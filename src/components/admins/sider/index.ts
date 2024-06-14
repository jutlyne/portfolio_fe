import type { MenuEvent, MenuItem } from '@/interfaces/MenuInterface'
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter, type RouteRecordName } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter()
    const route = useRoute()

    const selectedKeys = ref<(RouteRecordName | null | undefined)[]>([route.name])
    const openKeys = ref<string[]>([route.meta.routeParent as string])
    const menuItem = ref<MenuItem[]>([
      {
        key: 'blog',
        label: 'Blogs',
        title: 'Blogs',
        children: [
          {
            key: 'admin.blog.index',
            label: 'List',
            title: 'List',
            to: 'admin.blog.index'
          },
          {
            key: 'admin.blog.create',
            label: 'Create',
            title: 'Create',
            to: 'admin.blog.create'
          }
        ]
      }
    ])

    const handleSiderClick = ({ item }: MenuEvent) => {
      router.push({ name: item.to })
    }

    watch(route, () => {
      console.log(route)

      selectedKeys.value = [route.name]
    })

    return {
      selectedKeys,
      openKeys,
      menuItem,
      handleSiderClick
    }
  }
})
