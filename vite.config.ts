import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
  VantResolve,
  ElementPlusResolve,
  NutuiResolve,
  AntdResolve
} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      VueDevTools(),
      AutoImport({}),
      Components({}),
      createStyleImportPlugin({
        resolves: [
          AndDesignVueResolve(),
          VantResolve(),
          ElementPlusResolve(),
          NutuiResolve(),
          AntdResolve()
        ],
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              let oName = name
              if (name.includes('layout-')) {
                oName = 'layout'
              }
              if (name.includes('picker')) {
                oName = 'date-picker'
              }
              return `ant-design-vue/es/${oName}/style/index`
            }
          }
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      include: [
        '@ant-design/icons-vue',
        'lodash-es',
        'dayjs',
        'vue',
        'vue-router',
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
