type IFormTypes = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  filed: string
  type: IFormTypes
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
