import { defineComponent, reactive, computed, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { FormLoginStateInterface } from '@/interfaces/FormInterface'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'
import { saveTokenInfo } from '@/utils/axios'
import { Button, message, Form, Input } from 'ant-design-vue'
import { emailRules, passwordRules } from '@/validations/login'

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: Input.Password,
    AButton: Button
  },
  setup() {
    const router = useRouter()
    const onFetchData = ref<boolean>(false)
    const formState = reactive<FormLoginStateInterface>({
      email: '',
      password: ''
    })

    const onFinish = async (values: FormLoginStateInterface) => {
      onFetchData.value = true
      const hideMessage = message.loading('Loading...', 0)

      const { errorResult, result } = await login(values)

      if (result?.data) {
        await handleSuccessfulLogin(result.data)
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

    const handleSuccessfulLogin = async (data: { access_token: string; refresh_token: string }) => {
      saveTokenInfo(data.access_token, data.refresh_token)

      message.success('Login Success!', 2.5)
      await router.push({ name: 'admin.blogs.index' })
    }

    const handleLoginError = (errorResult: any) => {
      message.error(errorResult.response?.data?.message, 2.5)
    }

    return {
      formState,
      onFinish,
      disabled,
      emailRules,
      passwordRules
    }
  }
})
