import { defineAsyncComponent, defineComponent, onBeforeMount, reactive, ref } from 'vue'
import type { CreateBlogInterface } from '@/interfaces/BlogInterface'
import { useRoute, useRouter } from 'vue-router'
import { getDetail, updateBlog } from '@/api/blog'
import { message } from 'ant-design-vue'
import type { TagInterface } from '@/interfaces/TagInterface'
import { prepareFormDataWithSanitizedAnchors, remapAnchorIds } from '@/utils/string'

export default defineComponent({
  components: {
    FormBlog: defineAsyncComponent(() => import('../_form/FormBlog.vue'))
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const maxHeadingId = ref<number>(0)
    let blogId: number

    const fileUrl = ref<string | null>(null)
    const formState = reactive<CreateBlogInterface>({
      title: '',
      short_text: '',
      read_minutes: 0,
      categories: [],
      body: '',
      image: '',
      anchors: []
    })

    const originalState = reactive<CreateBlogInterface>({
      title: '',
      short_text: '',
      read_minutes: 0,
      categories: [],
      body: '',
      image: '',
      anchors: []
    })

    const blogSlug = route.params?.id as unknown as string

    const getChangedFields = () => {
      return Object.entries(formState).reduce<Partial<CreateBlogInterface>>(
        (fields, [key, value]) => {
          const blogKey = key as keyof CreateBlogInterface

          const originalValue = originalState[blogKey] ?? undefined
          const currentValue = value ?? undefined

          if (blogKey === 'categories') {
            if (JSON.stringify(originalValue) !== JSON.stringify(currentValue)) {
              fields[blogKey] = currentValue as CreateBlogInterface['categories']
            }
          } else if (blogKey === 'anchors') {
            fields[blogKey] = currentValue as CreateBlogInterface['anchors']
          } else if (JSON.stringify(originalValue) !== JSON.stringify(currentValue)) {
            fields[blogKey] = currentValue as CreateBlogInterface[typeof blogKey]
          }

          return fields
        },
        {}
      )
    }

    const handleFinish = async () => {
      const changedFields = getChangedFields()
      const formData = prepareFormDataWithSanitizedAnchors(changedFields)
      const { result, errorResult } = await updateBlog(
        blogId,
        formData as unknown as CreateBlogInterface
      )

      if (errorResult) {
        const errorData = errorResult.response.data
        message.error(errorData.messages || 'Failed')
      }

      if (result) {
        message.success(result.messages || 'Success')
        await router.push({ name: 'admin.blogs.index' })
      }
    }

    const getBlog = async () => {
      const blog = await getDetail(blogSlug)
      const { remappedAnchor, maxCounter } = remapAnchorIds(blog.anchors)
      blogId = blog.id
      maxHeadingId.value = maxCounter
      formState.body = blog.body
      formState.title = blog.title
      formState.short_text = blog.title
      formState.anchors = remappedAnchor
      formState.read_minutes = blog.read_minutes
      fileUrl.value = blog.image

      originalState.body = blog.body
      originalState.title = blog.title
      originalState.short_text = blog.title
      originalState.anchors = remappedAnchor
      originalState.read_minutes = blog.read_minutes
      originalState.image = blog.image

      blog.categories.map((category: TagInterface) => {
        if (category.id) {
          return formState.categories.push(category.id)
        }
      })
    }

    onBeforeMount(getBlog)

    return {
      handleFinish,
      formState,
      fileUrl,
      maxHeadingId
    }
  }
})
