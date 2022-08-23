const contentTableConfig = {
  title: '用户列表',
  showIndex: true,
  showSelect: true,
  propList: [
    { prop: 'name', label: '用户名', width: '100' },
    { prop: 'realname', label: '姓名', width: '100' },
    { prop: 'cellphone', label: '手机号', width: '120' },
    { prop: 'enable', label: '状态', width: '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', width: '200', slotName: 'create' },
    { prop: 'updateAt', label: '更新时间', width: '200', slotName: 'update' },
    { label: '操作', slotName: 'handle', width: '100' }
  ]
}
export default contentTableConfig
