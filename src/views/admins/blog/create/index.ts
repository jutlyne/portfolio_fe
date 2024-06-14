import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { initEditor } from '@/constants/constant'
import type { FormInstance, UploadProps } from 'ant-design-vue'

export default defineComponent({
  components: {
    PlusOutlined,
    Editor
  },
  setup() {
    const formRef = ref<FormInstance>()
    const formState = reactive<any>({
      title: '',
      short_text: '',
      tags: [],
      content: ''
    })

    const fileList = ref<UploadProps['fileList']>([])

    const labelCol = { span: 3 }
    const wrapperCol = { span: 21 }
    const value = ref<string[]>([])
    const treeData = ref<any['treeData']>([
      {
        label: 'parent 1',
        value: 'parent 1'
      },
      {
        label: 'parent 2',
        value: 'parent 2'
      },
      {
        label: 'parent 3',
        value: 'parent 3'
      },
      {
        label: 'parent 4',
        value: 'parent 4'
      },
      {
        label: 'parent 5',
        value: 'parent 5'
      }
    ])

    const handleFinish = (values: any) => {
      console.log(values, formState)
    }

    const beforeUpload: UploadProps['beforeUpload'] = (file) => {
      fileList.value = [file]
      return false
    }

    return {
      labelCol,
      wrapperCol,
      treeData,
      value,
      handleFinish,
      initEditor,
      formRef,
      formState,
      beforeUpload
    }
  }
})
