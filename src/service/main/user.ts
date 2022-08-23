import wjRequest from '../index'
import { IDataType } from '../login/types'
export function getUser(query: any) {
  return wjRequest.post<IDataType>({
    url: '/users/list',
    data: query
  })
}
export function deleteUser(id: string) {
  return wjRequest.delete<IDataType>({
    url: '/users/' + id
  })
}

export function createUser(data: any) {
  return wjRequest.post<IDataType>({
    url: '/users',
    data: data
  })
}
export function editeUser(id: string, data: any) {
  return wjRequest.patch<IDataType>({
    url: '/users/' + id,
    data: data
  })
}
