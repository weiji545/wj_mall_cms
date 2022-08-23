<template>
  <div class="nav-header">
    <el-icon :size="30" @click="handleClick" class="icon">
      <Expand v-if="!isFold" />
      <Fold v-else />
    </el-icon>
    <div class="content">
      <div>
        <WjBreadcrumb :breadcrumb-data="breadcrumbData" />
      </div>
      <div>
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import { getBreadcrumbs } from '@/utils/mapMenu'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import WjBreadcrumb from '@/base-ui/breadcrumb/index'
export default defineComponent({
  components: {
    userInfo,
    WjBreadcrumb
  },
  emits: ['changeFold'],
  setup(props, ctx) {
    const isFold = ref(false)
    const handleClick = () => {
      isFold.value = !isFold.value
      ctx.emit('changeFold', isFold.value)
    }
    const store = useStore()
    const breadcrumbData = computed(() => {
      const route = useRoute()
      const userMenu = store.state.login.userRole
      return getBreadcrumbs(userMenu, route.path)
    })

    return {
      isFold,
      handleClick,
      breadcrumbData
    }
  }
})
</script>

<style scoped lang="less">
.icon {
  cursor: pointer;
}
.nav-header {
  display: flex;
  width: 100%;
  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
