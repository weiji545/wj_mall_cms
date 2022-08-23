import { IForm } from '@/base-ui/form'

const formData: IForm = {
  formItems: [
    {
      filed: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      filed: 'time',
      type: 'datepicker',
      label: '时间范围',
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
