import wjRequest from '../index'
import { IDataType } from '../login/types'

export function getMenusList(query: any) {
  return wjRequest.post<IDataType>({
    url: '/menu/list',
    data: query
  })
}
