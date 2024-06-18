import { defineComponent, reactive, computed, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { FormLoginStateInterface } from '@/interfaces/FormInterface'
import InputForm from '@/components/input/InputForm.vue'
import { login } from '@/api/auth'
import { useCookies } from 'vue3-cookies'
import { useRouter } from 'vue-router'
import { api } from '@/utils/axios'
import { message } from 'ant-design-vue'
import { usernameRules, passwordRules } from '@/validations/login'

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    InputForm
  },
  setup() {
    const { cookies } = useCookies()
    const router = useRouter()
    const onFetchData = ref<boolean>(false)
    const formState = reactive<FormLoginStateInterface>({
      username: '',
      password: ''
    })

    const onFinish = async (values: FormLoginStateInterface) => {
      onFetchData.value = true
      const hideMessage = message.loading('Loading...', 0)

      const { errorResult, result } = await login(values)

      if (result && result?.data) {
        handleSuccessfulLogin(result.data)
      }

      if (errorResult) {
        handleLoginError(errorResult)
      }

      hideMessage()
      onFetchData.value = false
    }

    const disabled = computed(() => {
      return onFetchData.value
    })

    const handleSuccessfulLogin = (data: { token: string }) => {
      const tokenSplit = data?.token.split('.')
      if (tokenSplit && tokenSplit.length === 3) {
        localStorage.setItem('adminAccessToken', `${tokenSplit[0]}.${tokenSplit[1]}`)
        cookies.set('adminSignature', tokenSplit[2])
        api.defaults.headers.Authorization = `Bearer ${data?.token}`
        message.success('Login Success!', 2.5)
        router.push({ name: 'admin.blog.index' })
      }
    }

    const handleLoginError = (errorResult: any) => {
      message.error(errorResult.response?.data?.message, 2.5)
    }

    return {
      formState,
      onFinish,
      disabled,
      usernameRules,
      passwordRules
    }
  }
})
