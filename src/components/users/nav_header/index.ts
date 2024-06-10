import { defineComponent, h, ref, watch } from 'vue'
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons-vue'
import type { MenuEvent, MenuItem } from '@/interfaces/MenuInterface'
import { useRoute, useRouter, type RouteRecordName } from 'vue-router'

export default defineComponent({
  components: {
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const socialIcon = ['facebook', 'instagram', 'twitter']

    const current = ref<(RouteRecordName | null | undefined)[]>([route.name])
    const items = ref<MenuItem[]>([
      {
        key: 'blog',
        label: 'Blogs',
        title: 'Blogs',
        to: 'blog'
      },
      {
        key: 'facebook',
        icon: () => h(FacebookOutlined, { class: 'social social-border' }),
        url: 'https://www.facebook.com/JutLyNee',
        title: 'Facebook'
      },
      {
        key: 'instagram',
        icon: () => h(InstagramOutlined, { class: 'social' }),
        url: 'https://www.facebook.com/JutLyNee',
        title: 'Instagram'
      },
      {
        key: 'twitter',
        icon: () => h(TwitterOutlined, { class: 'social' }),
        url: 'https://www.facebook.com/JutLyNee',
        title: 'Twitter'
      }
    ])

    const handleMenuClick = ({ item }: MenuEvent) => {
      if (item.to && route.name != item.to) {
        router.push({ name: item.to, query: { ref: 1 } })
      } else if (item.url) {
        window.open(item.url, '_blank')
      }
    }

    watch(current, (newValue, oldValue) => {
      if (socialIcon.includes(newValue[0] as string)) {
        current.value = oldValue
      }
    })

    return {
      current,
      items,
      handleMenuClick
    }
  }
})
