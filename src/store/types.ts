import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
  entireRole: any[]
  entireDepartment: any[]
}

export interface IRootModules {
  login: ILoginState
}

export type IStore = IRootState & IRootModules
