import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// import resolve from "@vitejs/plugin-vue";


// const path = require('path')
// import {resolve} from 'path'

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    server: {
        open: true, //打开自动浏览器
        port: 8081  //配置端口号
    },
    define: {
        'proess.env': {
            'BASE_API': '/',
            'DEV_Env': 'dev'
        }
    }
    // resolve: {
    //     alias: {
    //         '@': resolve(__dirname, '.', 'src')
    //     }
    // }
})
