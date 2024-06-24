import { defineComponent, h, ref, watch } from 'vue'
import { FacebookOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons-vue'
import type { MenuEvent, MenuItem } from '@/interfaces/MenuInterface'
import { useRoute, useRouter, type RouteRecordName } from 'vue-router'

export default defineComponent({
  components: {},
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
      // {
      //   key: 'resume',
      //   label: 'Resume',
      //   title: 'Resume',
      //   to: 'resume'
      // },
      {
        key: 'facebook',
        icon: () => h(FacebookOutlined, { class: 'social social-border' }),
        url: 'https://www.facebook.com/JutLyNee',
        title: 'Facebook'
      },
      {
        key: 'instagram',
        icon: () => h(InstagramOutlined, { class: 'social' }),
        url: 'https://www.instagram.com/jut_ly',
        title: 'Instagram'
      },
      {
        key: 'github',
        icon: () => h(GithubOutlined, { class: 'social' }),
        url: 'https://github.com/jutlyne',
        title: 'Github'
      }
    ])

    const handleMenuClick = async ({ item }: MenuEvent) => {
      if (item.to && route.name != item.to) {
        const query = item.to == 'blog' ? { ref: 1 } : {}
        await router.push({ name: item.to, query })
      } else if (item.url) {
        window.open(item.url, '_blank')
      }
    }

    watch(current, (newValue, oldValue) => {
      if (socialIcon.includes(newValue[0] as string)) {
        current.value = oldValue
      }
    })

    watch(route, () => {
      current.value = [route.name]
    })

    return {
      current,
      items,
      handleMenuClick
    }
  }
})
