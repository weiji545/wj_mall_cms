<template>
  <div class="form_search">
    <wj-form v-bind="searchFormData" v-model="formData">
      <template #footer>
        <div class="footer">
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
        </div>
      </template>
    </wj-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WjForm from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormData: {
      type: Object,
      required: true
    }
  },
  components: {
    WjForm
  },
  emits: ['resetClick', 'queryClick'],
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'user',
  setup(props, { emit }) {
    const searchData: any = {}
    // for (const item of props.searchFormData?.formItems) {
    //   searchData[`${item.filed}`] = ''
    // }
    const formData = ref(searchData)
    // 重置
    const handleReset = () => {
      for (const key in searchData) {
        formData.value[key] = ''
      }
      emit('resetClick')
    }
    // 搜索
    const handleQuery = () => {
      emit('queryClick', formData.value)
    }
    return {
      formData,
      handleReset,
      handleQuery
    }
  }
})
</script>

<style scoped lang="less">
.form_search {
  padding: 0 30px 30px 0;
}
.footer {
  text-align: right;
}
</style>
