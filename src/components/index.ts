import { App } from 'vue'
import formTable from './formTable'
import formSeach from './formSearch'
import formModal from './formModal'

export default function (app: App) {
  app.component('formSeach', formSeach)
  app.component('formTable', formTable)
  app.component('formModal', formModal)
}
