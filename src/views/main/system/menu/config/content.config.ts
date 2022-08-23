const contentTableConfig = {
  title: '角色列表',
  propList: [
    { prop: 'name', label: '菜单名称', width: '150' },
    { prop: 'type', label: '级别', width: '80' },
    { prop: 'url', label: '菜单url', width: '120' },
    { prop: 'icon', label: '菜单icon', width: '120' },
    { prop: 'sort', label: '排序', width: '80' },
    { prop: 'permission', label: '权限', width: '150' },
    {
      prop: 'createAt',
      label: '创建时间',
      width: '220',
      slotName: 'create'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      width: '220',
      slotName: 'update'
    },
    { label: '操作', width: '120', slotName: 'handle' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}

export default contentTableConfig
