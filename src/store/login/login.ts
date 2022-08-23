import { Module } from 'vuex'
import { IRootState } from '../types'
import { ILoginState } from './types'

import { accountLogin, getUserInfo, getUserRole } from '@/service/login/login'
import { IAccount } from '@/service/login/types'
import { localCache } from '@/utils'
import router from '@/router'
import mapMenu, { getPermission } from '@/utils/mapMenu'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userRole: {},
      permission: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
      localCache.setCache('token', token)
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserRole(state, userRole: any) {
      state.userRole = userRole
      // 菜单权限
      const routes = mapMenu(userRole)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 按钮权限
      const permission = getPermission(userRole)
      state.permission = permission
    }
  },
  actions: {
    async accountLoginActions({ commit, dispatch }, payload: IAccount) {
      // 1.登录
      const loginResult = await accountLogin(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)

      // 拿到token，请求数据
      dispatch('getEntireRoleDep', null, { root: true })
      // 2.获取用户信息
      const userInfoResult = await getUserInfo(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 3.获取用户权限
      const userRoleResult = await getUserRole(userInfo.role.id)
      const userRole = userRoleResult.data
      commit('changeUserRole', userRole)
      localCache.setCache('userRole', userRole)
      // 4.跳转首页
      router.push('./main')
    },

    // 刷新时重新添加store数据
    localLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getEntireRoleDep', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userRole = localCache.getCache('userRole')
      if (userRole) {
        commit('changeUserRole', userRole)
      }
    }
  }
}

export default loginModule
