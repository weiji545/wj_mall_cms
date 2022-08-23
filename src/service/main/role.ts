import wjRequest from '../index'
import { IDataType } from '../login/types'

export function getRoleList(query: any) {
  return wjRequest.post<IDataType>({
    url: '/role/list',
    data: query
  })
}
export function deleteRole(id: string) {
  return wjRequest.delete<IDataType>({
    url: '/role/' + id
  })
}

export function createRole(data: any) {
  return wjRequest.post<IDataType>({
    url: '/role',
    data: data
  })
}
export function editeRole(id: string, data: any) {
  return wjRequest.patch<IDataType>({
    url: '/role/' + id,
    data: data
  })
}
