<template>
  <div class="form-modal">
    <el-dialog
      v-model="DialogVisible"
      title="添加"
      width="30%"
      center
      destroy-on-close
    >
      <wj-form v-bind="modalConfig" v-model="formData"></wj-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="DialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import WjForm from '@/base-ui/form'
export default defineComponent({
  components: {
    WjForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    editInfo: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleModalEdit', 'handleModalCreate'],
  setup(props, { emit }) {
    const DialogVisible = ref(false)
    const addData: any = {}
    // for (const item of props.modalConfig?.formItems) {
    //   addData[`${item.filed}`] = ''
    // }
    const formData = ref(addData)
    watch(
      () => props.editInfo,
      (newValue) => {
        console.log(props.editInfo)

        for (const item of props.modalConfig.formItems) {
          formData.value[item.filed] = newValue[item.filed]
        }
      }
    )
    const handleConfirm = () => {
      if (Object.keys(props.editInfo).length) {
        emit('handleModalEdit', formData.value)
      } else {
        emit('handleModalCreate', formData.value)
      }
    }
    return {
      DialogVisible,
      formData,
      handleConfirm
    }
  }
})
</script>

<style scoped lang="less"></style>
