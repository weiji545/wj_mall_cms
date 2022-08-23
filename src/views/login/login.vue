<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login">
    <login-pancel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPancel from './cpns/login-pancel.vue'
export default defineComponent({
  components: {
    LoginPancel
  }
})
</script>

<style lang="less" scpoed>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
