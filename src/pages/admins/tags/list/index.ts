import { deleteTag, getAllTags, store, updatePatch } from '@/api/tag'
import { injectionKeys } from '@/constants/injectionKeys'
import type { TagInterface } from '@/interfaces/TagInterface'
import { Button, Input, message, Space, Table } from 'ant-design-vue'
import { defineComponent, inject, onMounted, reactive, ref, type Ref, type UnwrapRef } from 'vue'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import moment from 'moment'
import ModalConfirm from '@/components/admins/modal/ModalConfirm.vue'

export default defineComponent({
  components: {
    ATable: Table,
    AInput: Input,
    AButton: Button,
    ASpace: Space,
    CheckOutlined,
    EditOutlined,
    ModalConfirm
  },
  setup() {
    let initId = 0

    const isLoading = inject<Ref<boolean>>(injectionKeys.isLoading)!

    const tableLoading = ref<boolean>(false)
    const dataSource = ref<TagInterface[]>([])

    const modalRef = ref<InstanceType<typeof ModalConfirm> | null>(null)
    const targetId = ref<number | null>(null)

    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: 'name',
        dataIndex: 'name'
      },
      {
        title: 'created at',
        dataIndex: 'created_at'
      },
      {
        title: 'operation',
        dataIndex: 'operation'
      }
    ]

    const fetchData = async (loading = true) => {
      isLoading.value = loading
      tableLoading.value = true
      try {
        const response = await getAllTags()

        dataSource.value = response.map((res: TagInterface) => {
          let createdAt = res.created_at
          if (!createdAt) {
            createdAt = moment()
          }

          return {
            ...res,
            created_at: moment(createdAt).format('DD-MM-YYYY')
          }
        })
      } finally {
        isLoading.value = false
        tableLoading.value = false
      }
    }

    const editableData: UnwrapRef<Record<string, TagInterface>> = reactive({})
    const edit = (id: number) => {
      editableData[id] = Object.assign({}, dataSource.value.filter((item) => id === item.id)[0])
    }

    const save = async (id: number) => {
      if (id <= 0) {
        await store({
          name: editableData[id].name
        })
      } else {
        await updatePatch(
          {
            name: editableData[id].name
          },
          id
        )
      }

      await fetchData(false)
    }

    const handleAdd = () => {
      const newData = {
        id: initId--,
        name: 'New Tag'
      }
      dataSource.value.unshift(newData)
    }

    const handleConfirmDelete = async () => {
      try {
        modalRef.value?.toggleConfirmLoading()
        if (targetId.value !== null) {
          await deleteTag(targetId.value)
          await fetchData(false)
        }

        message.success('Success!')
      } catch (error) {
        message.error('Failed to delete tag')
      } finally {
        modalRef.value?.toggleConfirmLoading()
        modalRef.value?.toggleOpen()
      }
    }

    const openModal = (id: number) => {
      targetId.value = id
      modalRef.value?.toggleOpen()
    }

    onMounted(fetchData)

    return {
      columns,
      tableLoading,
      dataSource,
      fetchData,
      editableData,
      edit,
      save,
      handleAdd,
      handleConfirmDelete,
      modalRef,
      openModal
    }
  }
})
