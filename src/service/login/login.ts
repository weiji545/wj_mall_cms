import wjRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/',
  UserRole = '/role/'
}
export function accountLogin(account: IAccount) {
  return wjRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
export function getUserInfo(id: number) {
  return wjRequest.get<IDataType>({
    url: LoginAPI.UserInfo + id,
    showLoading: false
  })
}

export function getUserRole(id: number) {
  return wjRequest.get<IDataType>({
    url: LoginAPI.UserRole + id + '/menu',
    showLoading: false
  })
}
