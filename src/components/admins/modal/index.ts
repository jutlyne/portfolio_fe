import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false
    },
    modalText: {
      type: String,
      required: true
    },
    handleOk: {
      required: true
    }
  },
  setup() {
    const open = ref<boolean>(false)
    const confirmLoading = ref<boolean>(false)

    const toggleOpen = () => {
      open.value = !open.value
    }

    const toggleConfirmLoading = () => {
      confirmLoading.value = !confirmLoading.value
    }

    return {
      open,
      toggleOpen,
      confirmLoading,
      toggleConfirmLoading
    }
  }
})
