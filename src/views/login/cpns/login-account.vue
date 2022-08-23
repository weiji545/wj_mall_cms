<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :model="account"
      :rules="accountRules"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { localCache } from '@/utils/index'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const accountRules = {
      name: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5-10个字母或者数字',
          trigger: 'blur'
        }
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 立即登录时接收 是否记住密码的参数
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            // 记住密码加入缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            // 不记住密码
            localCache.delCache('name')
            localCache.delCache('password')
          }
          // 登录验证
          store.dispatch('login/accountLoginActions', { ...account })
        }
      })
    }

    return {
      account,
      accountRules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped lang="less"></style>
