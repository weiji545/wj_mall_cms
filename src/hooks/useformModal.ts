import { ref } from 'vue'
import formModal from '@/components/formModal'
type callbackFn = (item?: any) => void
export default function (addFn?: callbackFn, editFn?: callbackFn) {
  const modalRef = ref<InstanceType<typeof formModal>>()
  const editInfo: any = ref({})
  const handleAdd = () => {
    editInfo.value = {}
    if (modalRef.value) {
      addFn && addFn()
      modalRef.value.DialogVisible = true
    }
  }
  const handleEdit = (row: any) => {
    editInfo.value = { ...row }
    if (modalRef.value) {
      editFn && editFn(row)
      modalRef.value.DialogVisible = true
    }
  }

  return { modalRef, editInfo, handleAdd, handleEdit }
}
