import { message } from 'ant-design-vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter()
    const { cookies } = useCookies()

    const logout = () => {
      message.loading('Loading...', 1.5).then(() => {
        localStorage.clear()
        cookies.keys().map((key: string) => {
          cookies.remove(key)
        })

        router.push({ name: 'admin.login' })
        message.success('Logout success!')
      })
    }

    return {
      logout
    }
  }
})
