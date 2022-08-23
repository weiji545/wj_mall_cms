<template>
  <div class="goods">
    <form-seach
      :search-form-data="searchFormData"
      @reset-click="handleReset"
      @query-click="handleQuery"
    ></form-seach>
    <form-table
      :tableConfig="contentTable"
      :listData="goodsList"
      :listTotal="listTotal"
      @page-change="pageChange"
      @handle-del="handleDel"
    >
      <!-- <template #handleDetail="scope">
        <el-button>{{ scope.row.newPrice }} </el-button>
      </template> -->
      <template #imageSlot="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="0"
          fit="cover"
          preview-teleported
        />
      </template>
      <template #goodStatus="scope">
        <el-button
          size="small"
          :type="scope.row.status ? 'primary' : 'danger'"
          >{{ scope.row.status ? '上架' : '下架' }}</el-button
        >
      </template>
    </form-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import formSeach from '@/components/formSearch'
import searchFormData from './config/search.config'
import formTable from '@/components/formTable'
import contentTable from './config/content.config'

import { getGoodsList, deleteGoods } from '@/service/main/goods'
import useFormSearch from '@/hooks/useFormSearch'
import useHandle from '@/hooks/useHandle'
export default defineComponent({
  name: 'goods',
  components: {
    formSeach,
    formTable
  },
  setup() {
    const queryParams = {
      offset: 0,
      size: 10
    }
    let goodsList = ref<any[]>([])
    let listTotal = ref(0)
    const getList = async (query: any = {}) => {
      const userRes = await getGoodsList({ ...queryParams, ...query })
      goodsList.value = userRes.data.list
      listTotal.value = userRes.data.totalCount
    }
    getList()

    const { handleReset, handleQuery, pageChange } = useFormSearch(getList)
    const handleDel = useHandle(deleteGoods, getList)

    return {
      contentTable,
      searchFormData,
      goodsList,
      listTotal,
      handleReset,
      handleQuery,
      pageChange,
      handleDel
    }
  }
})
</script>

<style scoped></style>
