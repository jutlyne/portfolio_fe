import { useRoute, type RouteLocationMatched } from 'vue-router'
import { defineComponent, onBeforeMount, ref, watch, type Ref } from 'vue'

interface Route {
  path: string
  breadcrumbName: string
}

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute()
    const routes = ref<Route[]>([])

    const getRouteName = (route: RouteLocationMatched) => {
      return route.name?.toString() || null
    }

    const getPath = (name: string, isLast: boolean): string => {
      if (name === 'admin') return 'admin.blogs.index'
      return isLast ? `${Date.now()}` : `admin.${name}.index`
    }

    const addBreadcrumb = (routes: Ref<Route[]>, name: string, path: string): void => {
      routes.value.push({
        breadcrumbName: name !== 'index' ? name : 'list',
        path
      })
    }

    const processRouteName = (routes: Ref<Route[]>, nameSplit: string[]): void => {
      nameSplit.forEach((name, index) => {
        const hasValue = routes.value.some((b) => b.breadcrumbName === name)
        if (!hasValue) {
          const path = getPath(name, index === nameSplit.length - 1)
          addBreadcrumb(routes, name, path)
        }
      })
    }

    const getBreadcrumb = () => {
      routes.value = []
      route.matched.forEach((r) => {
        const routeName = getRouteName(r)
        if (!routeName) return

        const nameSplit = routeName.split('.')
        processRouteName(routes, nameSplit)
      })
    }

    watch(route, getBreadcrumb)
    onBeforeMount(getBreadcrumb)

    return {
      routes
    }
  }
})
