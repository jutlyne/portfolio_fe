import { message } from 'ant-design-vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter()

    const logout = () => {
      message.loading('Loading...', 1.5).then(() => {
        localStorage.clear()
        router.push({ name: 'admin.login' })
        message.success('Logout success!')
      })
    }

    return {
      logout
    }
  }
})
