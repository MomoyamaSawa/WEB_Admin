// 注册components文件夹内部全部全局组件
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
// 引入全部的elementUI组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const components: { [name: string]: Component } = { SvgIcon }
export default {
    install(app: App) {
        // 注册项目全部全局组件
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key])
        })
        // 注册elementUI图标组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    },
}
