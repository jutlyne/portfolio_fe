import {
  defineComponent,
  inject,
  onBeforeMount,
  ref,
  toRefs,
  watch,
  type PropType,
  type Ref
} from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import Editor from '@tinymce/tinymce-vue'
import { initEditor } from '@/constants/constant'
import { message, type UploadChangeParam, type UploadProps } from 'ant-design-vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import { injectionKeys } from '@/constants/injectionKeys'
import { getAllTags } from '@/api/tag'
import type { TagInterface } from '@/interfaces/TagInterface'
import { validateImage } from '@/utils/file'
import { formRules } from '@/validations/blog'

export default defineComponent({
  props: {
    formState: {
      type: Object as PropType<CreateBlogInterface>,
      required: true
    },
    fileUrl: {
      type: String,
      default: null,
      required: false
    },
    handleFinish: {
      type: Function,
      required: true
    }
  },
  components: {
    PlusOutlined,
    Editor
  },
  setup(props) {
    const { formState, fileUrl } = toRefs(props)
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!

    isLoading.value = true
    const editorAPIKey = import.meta.env.VITE_EDITOR_API_KEY
    const labelCol = { span: 3 }
    const wrapperCol = { span: 21 }
    const treeData = ref([])

    const fetchAllTag = async () => {
      const tagResponse = await getAllTags()
      treeData.value = tagResponse.map((tag: TagInterface) => {
        return {
          label: tag.name,
          value: tag.slug
        }
      })
    }

    const configEditor = initEditor((loading: boolean) => {
      isLoading.value = loading
    })

    const fileListItem = ref<UploadProps['fileList']>([])

    const beforeUpload: UploadProps['beforeUpload'] = (file) => {
      formState.value.image = file
      return false
    }

    const handleChange = (info: UploadChangeParam) => {
      const isAllowedImage = validateImage(info.file)
      if (!isAllowedImage) {
        message.error('Hình ảnh không hợp lệ!')
        fileListItem.value = []
      }
    }

    watch(fileUrl, (newUrl: string) => {
      if (newUrl) {
        fileListItem.value = [
          {
            status: 'done',
            url: newUrl,
            uid: '',
            name: ''
          }
        ]
      } else {
        fileListItem.value = []
      }
    })

    onBeforeMount(fetchAllTag)

    return {
      labelCol,
      wrapperCol,
      treeData,
      configEditor,
      beforeUpload,
      editorAPIKey,
      fileListItem,
      isLoading,
      handleChange,
      formRules
    }
  }
})
