<template>
  <div class="menu">
    <form-table :tableConfig="contentTable" :listData="menuList"></form-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import contentTable from './config/content.config'

import { getMenusList } from '@/service/main/menu'

export default defineComponent({
  name: 'usermenu',
  setup() {
    const queryParams = {
      offset: 0,
      size: 10
    }
    let menuList = ref<any[]>([])
    const getList = async (query: any = {}) => {
      const userRes = await getMenusList({ ...queryParams, ...query })
      menuList.value = userRes.data.list
    }
    getList()

    return {
      contentTable,
      menuList
    }
  }
})
</script>

<style scoped></style>
