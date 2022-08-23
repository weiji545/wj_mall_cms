import wjRequest from '../index'
import { IDataType } from '../login/types'

export function getDeptList(query: any) {
  return wjRequest.post<IDataType>({
    url: '/department/list',
    data: query
  })
}
