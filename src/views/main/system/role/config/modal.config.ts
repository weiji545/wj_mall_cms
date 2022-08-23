import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      filed: 'intro',
      type: 'input',
      label: '角色描述',
      placeholder: '请输入角色描述'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}
