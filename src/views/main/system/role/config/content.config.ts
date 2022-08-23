const contentTableConfig = {
  title: '角色列表',
  showIndex: true,
  showSelect: true,
  propList: [
    { prop: 'name', label: '角色名', width: '100' },
    { prop: 'intro', label: '权限', width: '100' },
    { prop: 'createAt', label: '创建时间', width: '200', slotName: 'create' },
    { prop: 'updateAt', label: '更新时间', width: '200', slotName: 'update' },
    { label: '操作', slotName: 'handle', width: '100' }
  ]
}
export default contentTableConfig
