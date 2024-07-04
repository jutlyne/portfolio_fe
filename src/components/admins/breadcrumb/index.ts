import { useRoute } from 'vue-router'
import { defineComponent, onBeforeMount, ref, watch } from 'vue'

interface Route {
  path: string
  breadcrumbName: string
}

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute()
    const routes = ref<Route[]>([])

    const getBreadcrumb = () => {
      routes.value = []
      route.matched.forEach((r) => {
        const routeName = r.name?.toString()
        if (!routeName) return
        const nameSplit = routeName.split('.')
        nameSplit.forEach((name, index) => {
          const hasValue = routes.value.find((b) => {
            return b.breadcrumbName == name
          })

          if (!hasValue) {
            let path = 'admin.blogs.index'
            if (name !== 'admin') {
              path = `admin.${name}.index`

              if (index == nameSplit.length - 1) {
                path = `${Date.now()}`
              }
            }

            routes.value.push({
              breadcrumbName: name !== 'index' ? name : 'list',
              path
            })
          }
        })
      })
    }

    watch(route, getBreadcrumb)
    onBeforeMount(getBreadcrumb)

    return {
      routes
    }
  }
})
