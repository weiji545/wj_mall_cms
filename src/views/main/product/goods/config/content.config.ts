const contentTableConfig = {
  title: '商品列表',
  showIndex: true,
  showSelect: true,
  propList: [
    { prop: 'name', label: '商品名称', width: '100' },
    { prop: 'oldPrice', label: '原价格', width: '80' },
    { prop: 'newPrice', label: '新价格', width: '80' },
    // { prop: 'desc', label: '商品描述', width: '100' },
    { prop: 'status', label: '状态', width: '100', slotName: 'goodStatus' },
    { prop: 'imgUrl', label: '图片', width: '100', slotName: 'imageSlot' },
    { prop: 'inventoryCount', label: '库存', width: '80' },
    { prop: 'saleCount', label: '销量', width: '80' },
    { prop: 'favorCount', label: '收藏', width: '80' },
    { prop: 'address', label: '地址', width: '80' },
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
    { label: '操作', width: '220', slotName: 'handle' }
  ]
}
export default contentTableConfig
