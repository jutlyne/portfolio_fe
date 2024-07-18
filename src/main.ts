import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/reset.css'
import { limitString } from './constants/constant'

import Particles from '@tsparticles/vue3'

import { store } from './store'
import { loadFull } from 'tsparticles'
import { authenticateMiddleware } from './middleware/auth'

import VueLazyload from 'vue-lazyload'

import { Flex, Col, Row } from 'ant-design-vue'

const app = createApp(App)

router.beforeEach(authenticateMiddleware)

app.use(router)

app.use(Flex)
app.use(Col)
app.use(Row)

app.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  lazyComponent: true
})

app.use(Particles, {
  init: async (engine) => {
    await loadFull(engine)
  }
})

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

app.config.globalProperties.$isLocalEnvironment = import.meta.env.DEV

app.mount('#app')
