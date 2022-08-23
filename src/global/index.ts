import { App } from 'vue'
import { properties } from './properties'

export default function (app: App) {
  app.use(properties)
}
