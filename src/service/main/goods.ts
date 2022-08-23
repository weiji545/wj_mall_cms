import wjRequest from '../index'
import { IDataType } from '../login/types'

export function getGoodsList(query: any) {
  return wjRequest.post<IDataType>({
    url: '/goods/list',
    data: query
  })
}
export function deleteGoods(id: string) {
  return wjRequest.delete<IDataType>({
    url: '/goods/' + id
  })
}
