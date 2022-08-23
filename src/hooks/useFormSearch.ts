export default function userSearch(fun: (query: any) => void) {
  // 重置
  const handleReset = () => {
    fun({})
  }
  // 搜索
  const handleQuery = (query: any) => {
    fun(query)
  }
  // 分页
  const pageChange = (pageInfo: any) => {
    fun({
      offset: (pageInfo.page - 1) * pageInfo.size,
      size: pageInfo.size
    })
  }
  return { handleQuery, handleReset, pageChange }
}
