import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { limitString } from './constants/constant'

import Particles from '@tsparticles/vue3'

import { store } from './store'
import { loadFull } from 'tsparticles'
import { authenticateMiddleware } from './middleware/auth'

import { inject } from '@vercel/analytics';
 
inject({
  mode: 'production',
});

const app = createApp(App)

router.beforeEach(authenticateMiddleware)

app.use(router)
app.use(Antd)

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

app.mount('#app')
