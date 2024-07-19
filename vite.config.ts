import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [vue(), VueDevTools(), AutoImport({}), Components({})],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      include: [
        'fetch-jsonp',
        '@ant-design/icons-vue',
        'lodash-es',
        'dayjs',
        'vue',
        'vue-router',
        'vue-i18n',
        'async-validator'
      ]
    },
    build: {
      minify: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules') && !id.includes('ckeditor')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    }
  }
})
