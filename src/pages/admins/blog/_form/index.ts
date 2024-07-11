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
import { message, type UploadChangeParam, type UploadProps } from 'ant-design-vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import { injectionKeys } from '@/constants/injectionKeys'
import { getAllTags } from '@/api/tag'
import type { TagInterface } from '@/interfaces/TagInterface'
import { validateImage } from '@/utils/file'
import { formRules } from '@/validations/blog'

import { ClassicEditor } from 'ckeditor5'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { editorConfig } from '@/constants/constant'

import 'ckeditor5/ckeditor5.css'
import 'ckeditor5-premium-features/ckeditor5-premium-features.css'

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
    ckeditor: CKEditor.component
  },
  setup(props) {
    const { formState, fileUrl } = toRefs(props)
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!

    isLoading.value = true
    const labelCol = { span: 3 }
    const wrapperCol = { span: 21 }
    const treeData = ref([])

    const editor = ClassicEditor

    const fetchAllTag = async () => {
      const tagResponse = await getAllTags()
      isLoading.value = false
      treeData.value = tagResponse.map((tag: TagInterface) => {
        return {
          label: tag.name,
          value: tag.slug
        }
      })
    }

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
      beforeUpload,
      fileListItem,
      isLoading,
      handleChange,
      formRules,
      editor,
      editorConfig
    }
  }
})
