<template>
  <div class="role">
    <form-seach
      :search-form-data="searchFormData"
      @reset-click="handleReset"
      @query-click="handleQuery"
    ></form-seach>
    <form-table
      :tableConfig="contentTable"
      :listData="roleList"
      :list-total="listTotal"
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
      <el-tree
        class="menu_tree"
        :data="menuList"
        :check-strictly="false"
        show-checkbox
        ref="treeRef"
        node-key="id"
        @check="hanldeCheck"
        :default-checked-keys="[5]"
        :props="{ children: 'children', label: 'name' }"
      />
    </form-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'

import formSeach from '@/components/formSearch'
import formTable from '@/components/formTable'

import searchFormData from './config/search.config'
import contentTable from './config/content.config'
import { modalConfig } from './config/modal.config'
import useHandle from '@/hooks/useHandle'
import useformModal from '@/hooks/useformModal'
import useFormSearch from '@/hooks/useFormSearch'

import { getMenuLeaf } from '@/utils/mapMenu'
import {
  getRoleList,
  deleteRole,
  createRole,
  editeRole
} from '@/service/main/role'
import { getMenusList } from '@/service/main/menu'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    formSeach,
    formTable
  },
  setup() {
    const queryParams = ref({
      offset: '0',
      size: 10
    })
    let roleList = ref<any[]>([])
    let listTotal = ref(0)
    const getRoleData = async (query: any = {}) => {
      const userRes = await getRoleList({ ...queryParams.value, ...query })
      roleList.value = userRes.data.list
      listTotal.value = userRes.data.totalCount
      console.log(listTotal)
    }
    getRoleData()

    const modalConfigComp = computed(() => {
      return modalConfig
    })
    const { handleQuery, handleReset, pageChange } = useFormSearch(getRoleData)
    const handleDel = useHandle(deleteRole, getRoleData)
    const menuList = ref<any[]>([])
    const getMenus = async () => {
      const res = await getMenusList(queryParams)
      menuList.value = res.data.list
    }
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const editFn = async (row: any) => {
      getMenus()
      nextTick(() => {
        const leafKeys = getMenuLeaf(row.menuList)
        treeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const { modalRef, editInfo, handleAdd, handleEdit } = useformModal(
      getMenus,
      editFn
    )
    const treeModel = ref({})
    const hanldeCheck = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      treeModel.value = { menuList }
    }
    // 编辑
    const handleModalEdit = async (data: any) => {
      const res = await editeRole(editInfo.value.id, {
        ...data,
        ...treeModel.value
      })
      if (modalRef.value) {
        modalRef.value.DialogVisible = false
      }
      getRoleData()
      console.log(res)
    }
    // 新建
    const handleModalCreate = async (data: any) => {
      const res = await createRole({ ...data, ...treeModel.value })
      if (modalRef.value) {
        modalRef.value.DialogVisible = false
      }
      getRoleData()
      console.log(res)
    }
    return {
      searchFormData,
      contentTable,
      modalConfigComp,
      roleList,
      listTotal,
      menuList,
      hanldeCheck,
      handleQuery,
      handleReset,
      pageChange,
      handleDel,
      modalRef,
      editInfo,
      handleAdd,
      handleEdit,
      handleModalEdit,
      handleModalCreate,
      treeRef,
      treeModel
    }
  }
})
</script>

<style scoped lang="less">
.menu_tree {
  margin-left: 18px;
  // height: 100px;
  // overflow-y: auto;
}
</style>
