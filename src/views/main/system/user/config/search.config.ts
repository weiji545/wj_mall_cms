import { IForm } from '@/base-ui/form'

const formData: IForm = {
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      filed: 'realname',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名'
    },
    {
      filed: 'cellphone',
      type: 'input',
      label: '手机号',
      placeholder: '请输入手机号'
    },
    {
      filed: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          label: '开启',
          value: 1
        },
        {
          label: '关闭',
          value: 0
        }
      ]
    },
    {
      filed: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择日期范围',
      otherOptions: {
        'start-placeholder': '开始',
        'end-placeholder': '结束'
      }
    }
  ],
  labelWidth: '100px',
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    xs: 24
  },
  itemStyle: {
    padding: '20px 20px'
  }
}

export default formData
