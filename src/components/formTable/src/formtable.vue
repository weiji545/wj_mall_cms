<template>
  <div>
    <wj-table
      :listData="listData"
      v-bind="tableConfig"
      :listTotal="listTotal"
      v-model:page="pageInfo"
    >
      <!-- 1.header插槽 -->
      <template #handerHandle>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="danger">删除</el-button>
        <el-button type="primary" icon="Refresh">刷新</el-button>
      </template>
      <!-- 2.列插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable ? 'primary' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #create="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #update="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handle="scope">
        <slot name="handleDetail" :row="scope.row">
          <el-button
            size="small"
            type="text"
            icon="Edit"
            @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </slot>
      </template>
      <!-- 父组件使用插槽 -->
      <template
        v-for="item in otherSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
      <!-- 3.footer插槽 -->
    </wj-table>
  </div>
</template>

<script lang="ts">
import WjTable from '@/base-ui/table'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  components: {
    WjTable
  },
  props: {
    listData: {
      type: Array,
      required: true
    },
    listTotal: {
      type: Number,
      default: 0
    },
    tableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      default: ''
    }
  },
  emits: ['pageChange', 'handleDel', 'handleAdd', 'handleEdit'],
  setup(props, { emit }) {
    let pageInfo = ref({
      page: 1,
      size: 10
    })
    watch(pageInfo, () => {
      emit('pageChange', pageInfo.value)
    })
    // 默认插槽之外的插槽
    const otherSlots = props.tableConfig.propList.filter((item: any) => {
      if (item.slotName) {
        if (item.slotName === 'status') return false
        if (item.slotName === 'create') return false
        if (item.slotName === 'update') return false
        if (item.slotName === 'handle') return false
        return true
      }
    })
    // const isCreate = `system:${props.pageName}:create`
    // const isDelete = `system:${props.pageName}:delete`
    // const isUpdate = `system:${props.pageName}:update`
    // const isQuery = `system:${props.pageName}:query`
    const handleDelete = (row: any) => {
      emit('handleDel', row.id)
    }
    const handleAdd = () => {
      emit('handleAdd')
    }
    const handleEdit = (row: any) => {
      emit('handleEdit', row)
    }
    return {
      pageInfo,
      otherSlots,
      handleDelete,
      handleAdd,
      handleEdit
      // isCreate,
      // isDelete,
      // isUpdate,
      // isQuery
    }
  }
})
</script>

<style scoped lang="less"></style>
