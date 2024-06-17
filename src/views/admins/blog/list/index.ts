import { defineComponent, inject, onBeforeMount, ref, type Ref } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { deleteBlog, getList } from '@/api/blog'
import type { DataItem, TablePaginateInterface } from '@/interfaces/BlogInterface'
import { pageSizeAdmin } from '@/constants/constant'
import { injectionKeys } from '@/constants/injectionKeys'
import ModalConfirm from '@/components/admins/modal/ModalConfirm.vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    CheckOutlined,
    ModalConfirm
  },
  setup() {
    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!
    const modalContent = 'Are you sure you want to delete?'
    const modalRef = ref<InstanceType<typeof ModalConfirm> | null>(null)
    const tableLoading = ref<boolean>(true)
    const dataSource: Ref<DataItem[]> = ref([])
    const targetId = ref<number | null>(null)
    const currentPage = ref<number>(0)
    const paginationConfig = ref({
      total: 0,
      pageSize: pageSizeAdmin
    })

    const colors = [
      'volcano',
      'geekblue',
      'green',
      'magenta',
      'red',
      'cyan',
      'blue',
      'purple',
      'orange',
      'gold',
      'lime'
    ]

    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: 'Title', dataIndex: 'title', width: '30%' },
      { title: 'Tags', dataIndex: 'tags' },
      { title: 'Operation', dataIndex: 'operation' }
    ]

    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length)
      return colors[randomIndex]
    }

    const fetchData = async (loadingPage = false) => {
      tableLoading.value = true
      loadingPage ? (isLoading.value = true) : ''
      try {
        const skip = (currentPage.value - 1) * pageSizeAdmin
        const response = await getList({ limit: pageSizeAdmin, skip })
        dataSource.value = response.posts
        paginationConfig.value.total = response.total
      } catch (error) {
        message.error('Failed to load data')
      } finally {
        tableLoading.value = false
        loadingPage ? (isLoading.value = false) : ''
      }
    }

    const handleConfirmDelete = async () => {
      try {
        modalRef.value?.toggleConfirmLoading()
        if (targetId.value !== null) {
          await deleteBlog(targetId.value)
          await fetchData()
        }
      } catch (error) {
        message.error('Failed to delete blog')
      } finally {
        modalRef.value?.toggleConfirmLoading()
        modalRef.value?.toggleOpen()
      }
    }

    const handleChange = async (pagination: TablePaginateInterface) => {
      tableLoading.value = true
      currentPage.value = pagination.current
      try {
        const skip = (pagination.current - 1) * pageSizeAdmin
        const response = await getList({ limit: pageSizeAdmin, skip })
        dataSource.value = response.posts
      } catch (error) {
        message.error('Failed to change page')
      } finally {
        tableLoading.value = false
      }
    }

    const openModal = (id: number) => {
      targetId.value = id
      modalRef.value?.toggleOpen()
    }

    onBeforeMount(() => {
      fetchData(true)
    })

    return {
      dataSource,
      columns,
      getRandomColor,
      tableLoading,
      handleChange,
      paginationConfig,
      modalContent,
      modalRef,
      openModal,
      handleConfirmDelete
    }
  }
})
