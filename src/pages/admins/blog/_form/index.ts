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
import { Button, message, type UploadChangeParam, type UploadProps } from 'ant-design-vue'
import { PlusOutlined, CloseOutlined, EnterOutlined } from '@ant-design/icons-vue'
import type { BlogAnchorInterface, CreateBlogInterface } from '@/interfaces/BlogInterface'
import { injectionKeys } from '@/constants/injectionKeys'
import { getAllTags } from '@/api/tag'
import type { TagInterface } from '@/interfaces/TagInterface'
import { validateImage } from '@/utils/file'
import { formRules } from '@/validations/blog'

import { ClassicEditor } from 'ckeditor5'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { editorConfig } from '@/utils/ckeditor'

import 'ckeditor5/ckeditor5.css'
import 'ckeditor5-premium-features/ckeditor5-premium-features.css'
import { generateIdFromText } from '@/utils/string'

import { Input, Upload, TreeSelect, Form, Space, InputNumber } from 'ant-design-vue'

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
    },
    buttonText: {
      type: String,
      required: true
    }
  },
  components: {
    PlusOutlined,
    ckeditor: CKEditor.component,
    AInput: Input,
    AForm: Form,
    AFormItem: Form.Item,
    ATreeSelect: TreeSelect,
    AUpload: Upload,
    ASpace: Space,
    AButton: Button,
    AInputNumber: InputNumber,
    CloseOutlined,
    EnterOutlined
  },
  setup(props) {
    let startHeadingId = 0
    const { formState, fileUrl } = toRefs(props)
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!
    const headings = ref<BlogAnchorInterface[]>([])

    isLoading.value = true
    const treeData = ref([])

    const editor = ClassicEditor

    const fetchAllTag = async () => {
      const tagResponse = await getAllTags()
      isLoading.value = false
      treeData.value = tagResponse.map((tag: TagInterface) => {
        return {
          label: tag.name,
          value: tag.id
        }
      })

      headings.value = formState.value.headings
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

    const findHeadingByKey = (key: number | string) => {
      return headings.value.find((heading) => heading.key === key)
    }

    const addHeaderItem = () => {
      const headingItem: BlogAnchorInterface = {
        key: startHeadingId++,
        title: '',
        children: []
      }
      headings.value.push(headingItem)
    }

    const addChildHeader = (parentHeading: BlogAnchorInterface) => {
      if (!parentHeading.children) {
        parentHeading.children = []
      }
      parentHeading.children.push({
        key: startHeadingId++,
        title: ''
      })
    }

    const handleAddHeader = (parent_id?: number | string) => {
      if (typeof parent_id !== 'undefined') {
        const parentHeading = findHeadingByKey(parent_id)
        if (parentHeading) {
          addChildHeader(parentHeading)
        }
      } else {
        addHeaderItem()
      }
    }

    const handleRemoveHeader = (id: number | string) => {
      const findAndRemove = (items: BlogAnchorInterface[]) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item.key === id) {
            items.splice(i, 1)
            return true
          }
          if (item.children && findAndRemove(item.children)) {
            return true
          }
        }
        return false
      }

      findAndRemove(headings.value)
    }

    const assignHeading = () => {
      headings.value.map((heading) => {
        heading.href = '#' + generateIdFromText(heading.title)
        heading.children?.map((h) => {
          h.href = '#' + generateIdFromText(h.title)
        })
      })
      formState.value.headings = headings.value
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
      treeData,
      beforeUpload,
      fileListItem,
      isLoading,
      handleChange,
      formRules,
      editor,
      editorConfig,
      headings,
      handleAddHeader,
      handleRemoveHeader,
      assignHeading
    }
  }
})
