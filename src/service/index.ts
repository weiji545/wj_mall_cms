import WJrequest from './request/request'
import { BAER_URL, TIME_OUT } from './request/config'
import { localCache } from '@/utils'

const wjRequest = new WJrequest({
  baseURL: BAER_URL,
  timeout: TIME_OUT,
  // showLoading: false,
  interceptors: {
    requestInterceptor: (config) => {
      // 请求头添加token
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default wjRequest
