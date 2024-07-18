import { defineComponent, ref } from 'vue'

import { Modal } from 'ant-design-vue'

export default defineComponent({
  components: {
    AModal: Modal
  },
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
