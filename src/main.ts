import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { limitString } from './constants/constant'

import { store } from './store'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.use(store)

app.config.globalProperties.$filters = {
  str_limit(value: string, size = limitString) {
    if (!value) return ''
    value = value.toString()

    if (value.length <= size) {
      return value
    }
    return value.substr(0, size) + '...'
  }
}

app.mount('#app')
