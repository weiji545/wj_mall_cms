<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user">
    <form-seach
      :search-form-data="searchFormData"
      @reset-click="handleReset"
      @query-click="handleQuery"
    ></form-seach>
    <form-table
      :tableConfig="contentTable"
      :listData="userList"
      :listTotal="listTotal"
      @page-change="pageChange"
      @handle-del="handleDel"
      @handle-add="handleAdd"
      @handle-edit="handleEdit"
    ></form-table>
    <form-modal
      :modalConfig="modalConfigComp"
      ref="modalRef"
      :editInfo="editInfo"
      @handleModalEdit="handleModalEdit"
      @handleModalCreate="handleModalCreate"
    >
    </form-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import formSeach from '@/components/formSearch'
import formTable from '@/components/formTable'
import formModal from '@/components/formModal'

import searchFormData from './config/search.config'
import contentTable from './config/content.config'
import { modalConfig } from './config/modal.config'

import { getUser, deleteUser, createUser, editeUser } from '@/service/main/user'

import useFormSearch from '@/hooks/useFormSearch'
import useHandle from '@/hooks/useHandle'
import useFormModal from '@/hooks/useformModal'
import store from '@/store'
export default defineComponent({
  name: 'user',
  components: {
    formSeach,
    formTable,
    formModal
  },

  setup() {
    const queryParams = {
      offset: 0,
      size: 10
    }
    let userList = ref<any[]>([])
    let listTotal = ref(0)
    const getList = async (query: any = {}) => {
      const userRes = await getUser({ ...queryParams, ...query })
      userList.value = userRes.data.list
      listTotal.value = userRes.data.totalCount
    }
    getList()
    // 使用computed，依赖项改变时刷新页面
    const modalConfigComp = computed(() => {
      const roleOptions = modalConfig.formItems.find((item) => {
        return item.filed === 'roleId'
      })
      roleOptions!.options = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id }
      })
      const deptOptions = modalConfig.formItems.find((item) => {
        return item.filed === 'departmentId'
      })
      deptOptions!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id }
      })
      return modalConfig
    })
    // const pageChange = (pageInfo: any) => {
    //   getList({
    //     offset: pageInfo.page * pageInfo.size,
    //     size: pageInfo.size
    //   })
    // }

    // // 重置
    // const handleReset = () => {
    //   getList()
    // }
    // // 搜索
    // const handleQuery = (query: any) => {
    //   getList(query)
    // }
    // hooks 抽取重复代码到hooks
    const { handleQuery, handleReset, pageChange } = useFormSearch(getList)

    // 删除

    // const handleDel = (id: string) => {
    //   deleteUser(id)
    // }
    const handleDel = useHandle(deleteUser, getList)

    const editFn = () => {
      const password = modalConfig.formItems.find((item) => {
        return item.filed === 'password'
      })
      password!.isHidden = true
    }
    const addFn = () => {
      const password = modalConfig.formItems.find((item) => {
        return item.filed === 'password'
      })
      password!.isHidden = false
    }
    const { handleAdd, handleEdit, modalRef, editInfo } = useFormModal(
      addFn,
      editFn
    )
    // 编辑
    const handleModalEdit = async (data: any) => {
      const res = await editeUser(editInfo.value.id, data)
      if (modalRef.value) {
        modalRef.value.DialogVisible = false
      }
      getList()
      console.log(res)
    }
    // 新建
    const handleModalCreate = async (data: any) => {
      const res = await createUser(data)
      if (modalRef.value) {
        modalRef.value.DialogVisible = false
      }
      getList()
      console.log(res)
    }
    return {
      searchFormData,
      contentTable,
      modalConfigComp,
      userList,
      listTotal,
      handleReset,
      handleQuery,
      pageChange,
      handleDel,
      handleAdd,
      handleEdit,
      modalRef,
      editInfo,
      handleModalEdit,
      handleModalCreate
    }
  }
})
</script>

<style scoped></style>
