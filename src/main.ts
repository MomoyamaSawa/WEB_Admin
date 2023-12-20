import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import gloablComponent from './components/index'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
// 暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入自定义指令
import { isHasButton } from './directive/has'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(gloablComponent)
app.use(router)
app.use(pinia)
isHasButton(app)
import './permission'
app.mount('#app')
