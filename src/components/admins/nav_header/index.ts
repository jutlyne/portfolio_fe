import { clearTokenInfo } from '@/utils/axios'
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalConfirm from '../modal/ModalConfirm.vue'

export default defineComponent({
  components: {
    ModalConfirm
  },
  setup() {
    const router = useRouter()
    const modalContent = 'Logout ?'

    const modalRef = ref<InstanceType<typeof ModalConfirm> | null>(null)

    const logout = () => {
      modalRef.value?.toggleConfirmLoading()
      message.loading('Loading...', 1.5).then(() => {
        clearTokenInfo()

        router.push({ name: 'admin.login' })
        message.success('Logout success!')
      })
    }

    const openModal = () => {
      modalRef.value?.toggleOpen()
    }

    return {
      logout,
      modalContent,
      openModal,
      modalRef
    }
  }
})
