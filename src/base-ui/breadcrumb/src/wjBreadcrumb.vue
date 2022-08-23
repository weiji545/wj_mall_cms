<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="item in breadcrumbData"
        :key="item.name"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../types'
export default defineComponent({
  props: {
    breadcrumbData: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  }
})
</script>

<style scoped lang="less"></style>
