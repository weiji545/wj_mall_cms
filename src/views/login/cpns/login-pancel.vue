<template>
  <div class="login-pancel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
        <div class="control">
          <el-checkbox
            v-model="isKeepPassword"
            label="记住密码"
            size="large"
            @change="keepWordClick"
          />
          <el-link type="primary" :underline="false">忘记密码</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Config">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" class="login-btn" @click="loginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { localCache } from '@/utils'
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(localCache.getCache('isKeepWord')) ?? ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const keepWordClick = (value: boolean) => {
      localCache.setCache('isKeepWord', value)
    }
    const loginClick = () => {
      accountRef.value?.loginAction(isKeepPassword.value)
    }
    return {
      isKeepPassword,
      accountRef,
      keepWordClick,
      loginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-pancel {
  margin-bottom: 200px;
  width: 320px;
  .title {
    text-align: center;
  }
  .control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    height: 40px;
    margin-top: 10px;
  }
}
</style>
