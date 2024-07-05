import type { MenuEvent, MenuItem } from '@/interfaces/MenuInterface'
import { defineComponent, h, ref, watch } from 'vue'
import { useRoute, useRouter, type RouteRecordName } from 'vue-router'
import { BookOutlined, CommentOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter()
    const route = useRoute()

    const collapsed = ref<boolean>(false)
    const selectedKeys = ref<(RouteRecordName | null | undefined)[]>([route.name])
    const openKeys = ref<string[]>([route.meta.routeParent as string])
    const menuItem = ref<MenuItem[]>([
      {
        key: 'blog',
        label: 'Blogs',
        title: 'Blogs',
        icon: () => h(BookOutlined),
        children: [
          {
            key: 'admin.blogs.index',
            label: 'List',
            title: 'List',
            to: 'admin.blogs.index'
          },
          {
            key: 'admin.blogs.create',
            label: 'Create',
            title: 'Create',
            to: 'admin.blogs.create'
          }
        ]
      },
      {
        key: 'comment',
        label: 'Comments',
        title: 'Comments',
        icon: () => h(CommentOutlined),
        children: [
          {
            key: 'admin.comments.index',
            label: 'List',
            title: 'List',
            to: 'admin.comments.index'
          }
        ]
      }
    ])

    const handleSiderClick = async ({ item }: MenuEvent) => {
      await router.push({ name: item.to })
    }

    watch(route, () => {
      selectedKeys.value = [route.name]
    })

    return {
      selectedKeys,
      openKeys,
      menuItem,
      handleSiderClick,
      collapsed
    }
  }
})
