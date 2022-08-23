<template>
  <div class="wj_table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="handerHandle"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      @selection-change="handleSelect"
      v-bind="childrenProps"
    >
      <el-table-column v-if="showSelect" type="selection"></el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        width="60"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column
          align="center"
          :prop="propItem.prop"
          :label="propItem.label"
          :min-width="propItem.width"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-size="page.size"
          :total="listTotal"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    listTotal: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<any[]>,
      required: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    page: {
      type: Object,
      default: () => {
        return {
          page: 0,
          size: 10
        }
      }
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelect = (value: any) => {
      emit('selectChange', value)
    }
    const handleSizeChange = (size: number) => {
      emit('update:page', { ...props.page, size })
    }
    const handleCurrentChange = (page: number) => {
      emit('update:page', { ...props.page, page })
    }
    return {
      handleSelect,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.wj_table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    justify-content: flex-end;
  }
}
</style>
