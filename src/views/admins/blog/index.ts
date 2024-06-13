import { defineComponent, onBeforeMount } from 'vue'
import { reactive, ref } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { getList } from '@/api/blog'
import type { DataItem, TablePaginateInterface } from '@/interfaces/BlogInterface'
import { pageSizeAdmin } from '@/constants/constant'

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined
  },
  setup() {
    const tableLoading = ref<boolean>(true)
    const dataSource: Ref<DataItem[]> = ref([])
    const paginationConfig = ref<any>({
      total: 0,
      pageSize: pageSizeAdmin
    })

    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: 'title',
        dataIndex: 'title',
        width: '30%'
      },
      {
        title: 'tags',
        dataIndex: 'tags'
      },
      {
        title: 'operation',
        dataIndex: 'operation'
      }
    ]

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

    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length)
      return colors[randomIndex]
    }

    onBeforeMount(async () => {
      const response = await getList({ limit: pageSizeAdmin })
      dataSource.value = response.posts
      tableLoading.value = false
      paginationConfig.value.total = response.total
    })

    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter((item) => item.key !== key)
    }

    const handleChange = async (pagination: TablePaginateInterface) => {
      tableLoading.value = true
      const skip = pagination.current * pageSizeAdmin
      const response = await getList({ limit: pageSizeAdmin, skip })
      dataSource.value = response.posts
      tableLoading.value = false
    }

    return {
      onDelete,
      dataSource,
      columns,
      editableData,
      getRandomColor,
      tableLoading,
      handleChange,
      paginationConfig
    }
  }
})
