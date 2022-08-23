/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

// 给接口添加泛型，传给responseInterceptor
interface WJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}
interface WJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: WJRequestInterceptors<T>
  showLoading?: boolean
}

class WJRequest {
  instance: AxiosInstance
  interceptors?: WJRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: WJRequestConfig) {
    this.instance = axios.create(config)
    // 单独实例控制loading是否显示
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors
    // 单独实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据中...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()

        // 只返回需要的data数据
        const data = res.data
        // 根据服务器返回的请求状态，判断是否请求成功
        // if (data.code === '-1001') {
        //   console.log()
        // } else {
        return data
        // }
      },
      (err) => {
        this.loading?.close()
        console.log(err)
        // 可以用switch
        if (err.response.status === 404) {
          console.log()
        }
        return err
      }
    )
  }

  request<T>(config: WJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单独请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 单独请求的loading显示
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 响应后设置回默认值
          this.showLoading = true
          resolve(res)
        },
        (err) => {
          reject(err)
          this.showLoading = false
        }
      )
    })
  }
  get<T>(config?: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'get'
    })
  }
  post<T>(config?: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'post'
    })
  }
  delete<T>(config?: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'delete'
    })
  }
  put<T>(config?: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'put'
    })
  }
  patch<T>(config?: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'patch'
    })
  }
}
export default WJRequest
