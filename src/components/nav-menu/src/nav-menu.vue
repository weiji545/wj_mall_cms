<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="" />
      <span class="title" v-if="!collapse">Vue3+Ts</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :default-active="activeMenu"
    >
      <template v-for="item in userMenu" :key="item.id">
        <el-sub-menu
          v-if="item.children && item.children.length"
          :index="item.url"
        >
          <template #title>
            <el-icon
              ><component :is="item.icon.split('-')[2]"></component
            ></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item
              :index="subitem.url"
              @click="handleItemClick(subitem)"
            >
              <i v-if="subitem.icon" :class="subitem.icon"></i>
              <span>{{ subitem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else></el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { defineComponent, computed, ref } from 'vue'
// import { getActivePath } from '@/utils/mapMenu'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // 1.获取menu
    const store = useStore()
    const router = useRouter()
    const userMenu = computed(() => store.state.login.userRole)

    // 当前route
    const route = useRoute()
    const currentPath = route.path
    // const menu = getActivePath(userMenu.value, currentPath)

    const activeMenu = ref(currentPath)

    const handleItemClick = (data: any) => {
      router.push({ path: data.url })
    }
    return {
      userMenu,
      activeMenu,
      handleItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu {
  border-right: none;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
