import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
// 引入路由
import router from "./router/index.js";
// 引入数据状态管理
import store from "./store/index.js";
// 引入数据模拟mock相关代码
import './mock/index.js'
// process.env.DEV_Env != "production" && import './mock/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import def from './styles/default.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
