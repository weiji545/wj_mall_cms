import { App } from 'vue'
import { utcToDateTime } from '@/utils'
export function properties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return utcToDateTime(value)
    }
  }
}
