import { defineComponent, inject, onBeforeMount, reactive, ref, type Ref } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { deleteBlog, getList } from '@/api/blog'
import type {
  DataItem,
  SearchStateInterface,
  TablePaginateInterface
} from '@/interfaces/BlogInterface'
import { pageSizeAdmin } from '@/constants/constant'
import { injectionKeys } from '@/constants/injectionKeys'
import ModalConfirm from '@/components/admins/modal/ModalConfirm.vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { getProfile } from '@/api/auth'
import SearchComponent from '@/components/admins/search/SearchComponent.vue'

export default defineComponent({
  components: {
    CheckOutlined,
    ModalConfirm,
    SearchComponent
  },
  setup() {
    const router = useRouter()
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
      { title: 'ID', dataIndex: 'id', width: '70px' },
      { title: 'Title', dataIndex: 'body', ellipsis: true },
      { title: 'Tags', dataIndex: 'tags', width: '300px' },
      { title: 'Operation', dataIndex: 'operation', width: '250px' }
    ]

    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length)
      return colors[randomIndex]
    }

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
        const params = {
          limit: pageSizeAdmin,
          skip,
          ...searchState
        }
        const response = await getList(params)

        dataSource.value = response.posts
        paginationConfig.value.total = response.total
      } catch (error) {
        message.error('Failed to load data')
      } finally {
        tableLoading.value = false
        handleLoading(loadingPage, false)
      }
    }

    const handleLoading = (loading: boolean, value: boolean) => {
      if (loading && typeof loading == 'boolean') {
        isLoading.value = value
      }
    }

    const handleConfirmDelete = async () => {
      try {
        modalRef.value?.toggleConfirmLoading()
        if (targetId.value !== null) {
          await deleteBlog(targetId.value)
          await fetchData()
        }

        message.success('Success!')
      } catch (error) {
        message.error('Failed to delete blog')
      } finally {
        modalRef.value?.toggleConfirmLoading()
        modalRef.value?.toggleOpen()
      }
    }

    const openModal = (id: number) => {
      targetId.value = id
      modalRef.value?.toggleOpen()
    }

    const edit = async (id: number) => {
      await router.push({ name: 'admin.blogs.edit', params: { id } })
    }

    const searchState = reactive<SearchStateInterface>({})

    const handleSearch = () => {
      fetchData()
    }

    onBeforeMount(() => {
      fetchData(null, true)
      getProfile()
    })

    return {
      dataSource,
      columns,
      getRandomColor,
      tableLoading,
      fetchData,
      paginationConfig,
      modalContent,
      modalRef,
      openModal,
      handleConfirmDelete,
      edit,
      searchState,
      handleSearch
    }
  }
})
