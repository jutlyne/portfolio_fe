import { defineComponent, reactive, computed, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { FormLoginStateInterface } from '@/interfaces/FormInterface'
import InputForm from '@/components/input/InputForm.vue'
import { login } from '@/api/auth'
import { useCookies } from 'vue3-cookies'
import { useRouter } from 'vue-router'

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

    const usernameRules = [
      {
        required: true,
        whitespace: true,
        message: 'Nhập vào tên đăng nhập!'
      },
      {
        min: 6,
        message: 'Tên đăng nhập phải lớn hơn 6 ký tự!'
      }
    ]
    const passwordRules = [
      {
        required: true,
        whitespace: true,
        message: 'Nhập vào mật khẩu!'
      },
      {
        min: 6,
        message: 'Mật khẩu phải lớn hơn 6 ký tự!'
      }
    ]

    const onFinish = async (values: any) => {
      onFetchData.value = true
      try {
        const response = await login(values)
        if (response && response?.result?.data) {
          const tokenSplit = response?.result?.data?.token.split('.')
          if (tokenSplit && tokenSplit.length == 3) {
            localStorage.setItem('adminAccessToken', `${tokenSplit[0]}.${tokenSplit[1]}`)
            cookies.set('adminSignature', tokenSplit[2])
          }

          router.push({ name: 'admin.blog' })
        }
      } catch (error) {
        console.log(error)
      }
      onFetchData.value = false
    }

    const disabled = computed(() => {
      return onFetchData.value
    })

    return {
      formState,
      onFinish,
      disabled,
      usernameRules,
      passwordRules
    }
  }
})
