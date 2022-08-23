import { createStore, useStore as useVuexStore, Store } from 'vuex'
import { IRootState } from './types'
import type { IStore } from './types'
import { getRoleList } from '@/service/main/role'
import { getDeptList } from '@/service/main/department'
import login from './login/login'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'xy',
      age: 18,
      entireRole: [],
      entireDepartment: []
    }
  },
  mutations: {
    changeRole(state, role) {
      state.entireRole = role
    },
    changeDept(state, dept) {
      state.entireDepartment = dept
    }
  },
  actions: {
    async getEntireRoleDep({ commit }) {
      const roleRes = await getRoleList({ offset: 0, size: 100 })
      const deptRes = await getDeptList({ offset: 0, size: 100 })
      commit('changeRole', roleRes.data.list)
      commit('changeDept', deptRes.data.list)
    }
  },
  modules: {
    login
  }
})

// 刷新时重新添加store数据
export function setupStore() {
  store.dispatch('login/localLogin')
  // 接口异步请求时可能还没拿到token，防止bug
  // store.dispatch('getEntireRoleDep')
}

export function useStore(): Store<IStore> {
  return useVuexStore()
}
export default store
