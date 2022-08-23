import wjRequest from '../index'
import { IDataType } from '../login/types'

export function getGoodsCount() {
  return wjRequest.get<IDataType>({
    url: '/goods/category/count'
  })
}

export function getGoodsSale() {
  return wjRequest.get<IDataType>({
    url: '/goods/category/sale'
  })
}

export function getGoodsFavor() {
  return wjRequest.get<IDataType>({
    url: '/goods/category/favor'
  })
}

export function getAddressSale() {
  return wjRequest.get<IDataType>({
    url: '/goods/address/sale'
  })
}
