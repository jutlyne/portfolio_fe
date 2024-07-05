import { defineComponent, inject, onBeforeMount, ref, type Ref } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { addComment, deleteComment, getList } from '@/api/comment'
import type { DataItem, TablePaginateInterface } from '@/interfaces/BlogInterface'
import { pageSizeAdmin } from '@/constants/constant'
import { injectionKeys } from '@/constants/injectionKeys'
import ModalConfirm from '@/components/admins/modal/ModalConfirm.vue'
import { message } from 'ant-design-vue'
import type { CommentInterface, StoreCommentInterface } from '@/interfaces/CommentInterface'

export default defineComponent({
  components: {
    CheckOutlined,
    ModalConfirm
  },
  setup() {
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!
    const modalContent = 'Are you sure you want to delete?'
    const modalInputPlaceholder = ref<string | null>(null)
    const modalRef = ref<InstanceType<typeof ModalConfirm> | null>(null)
    const handleOk = ref<() => Promise<void>>()
    const tableLoading = ref<boolean>(true)
    const replyInput = ref<string>('')
    const dataSource: Ref<DataItem[]> = ref([])
    const targetId = ref<number | null>(null)
    const currentPage = ref<number>(0)
    const paginationConfig = ref({
      total: 0,
      pageSize: pageSizeAdmin
    })

    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: 'Title', ellipsis: true, dataIndex: 'body', width: '30%' },
      { title: 'Blog title', ellipsis: true, dataIndex: 'postId' },
      { title: 'Username', dataIndex: 'username' },
      { title: 'Operation', dataIndex: 'operation' }
    ]

    const fetchData = async (
      pagination: TablePaginateInterface | null = null,
      loadingPage = false
    ) => {
      tableLoading.value = true
      handleLoading(loadingPage, true)
      if (pagination) {
        currentPage.value = pagination.current
      }

      try {
        const currentPageValue = currentPage.value ? currentPage.value - 1 : currentPage.value
        const skip = currentPageValue * pageSizeAdmin
        const response = await getList({ limit: pageSizeAdmin, skip })

        paginationConfig.value.total = response.total
        dataSource.value = response.comments.map((comment: CommentInterface) => ({
          id: comment.id,
          body: comment.body,
          postId: comment.postId,
          username: comment.user.username
        }))
      } catch (error) {
        message.error('Failed to load data')
      } finally {
        tableLoading.value = false
        handleLoading(loadingPage, false)
      }
    }

    const handleLoading = (loading: boolean, value: boolean) => {
      if (loading && typeof loading === 'boolean') {
        isLoading.value = value
      }
    }

    const handleAction = async (
      successMessage: string,
      errorMessage: string,
      actionFunction?: () => Promise<void>
    ) => {
      try {
        modalRef.value?.toggleConfirmLoading()
        if (typeof actionFunction === 'function') {
          await actionFunction()
        }
        await fetchData()
        message.success(successMessage)
      } catch (error) {
        message.error(errorMessage)
      } finally {
        modalRef.value?.toggleConfirmLoading()
        modalRef.value?.toggleOpen()
      }
    }

    const handleConfirmDelete = async () => {
      await handleAction('Success!', 'Failed to delete blog', () =>
        deleteComment(targetId.value as number).then(() => Promise.resolve())
      )
    }

    const handleReplyComment = async () => {
      if (replyInput.value) {
        const params: StoreCommentInterface = {
          body: replyInput.value,
          postId: targetId.value as number,
          userId: 1
        }
        await handleAction('Success!', 'Failed to add comment', () =>
          addComment(params).then(() => Promise.resolve())
        )
      } else {
        modalRef.value?.toggleOpen()
      }
    }

    const openModal = (id: number) => {
      modalInputPlaceholder.value = null
      targetId.value = id
      modalRef.value?.toggleOpen()
      handleOk.value = handleConfirmDelete
    }

    const openModalReply = (id: number) => {
      replyInput.value = ''
      modalInputPlaceholder.value = 'Reply comment'
      targetId.value = id
      modalRef.value?.toggleOpen()
      handleOk.value = handleReplyComment
    }

    onBeforeMount(() => {
      fetchData(null, true)
    })

    return {
      dataSource,
      columns,
      tableLoading,
      fetchData,
      paginationConfig,
      modalContent,
      modalRef,
      openModal,
      openModalReply,
      replyInput,
      modalInputPlaceholder,
      handleOk
    }
  }
})
