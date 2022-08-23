import { IDataType } from '@/service/login/types'
import { ElMessage } from 'element-plus'
export default function (
  deleteFun: (id: string) => Promise<IDataType<any>>,
  getFun: () => void
) {
  const handleDel = async (id: string) => {
    const res = await deleteFun(id)

    if (res.code === -1002) {
      ElMessage({
        message: res.data,
        type: 'error'
      })
    } else {
      ElMessage({
        message: res.data,
        type: 'success'
      })
      getFun()
    }
  }
  return handleDel
}
