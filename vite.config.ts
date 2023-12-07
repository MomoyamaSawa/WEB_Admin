// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 增强setup语法糖功能
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig(({ command, mode }) => {
    // 获取各种环境下对应的变量
    let env = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
            }),
            viteMockServe({
                localEnabled: command === 'serve', // 保证开发阶段可以使用 mock 接口
            }),
            VueSetupExtend(),
        ],
        resolve: {
            alias: {
                '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
            },
        },
        // scss全局变量配置
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";',
                },
            },
        },
        // 代理
        server: {
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    // 服务器地址
                    target: env.VITE_SERVE,
                    // 是否代理跨域
                    changeOrigin: true,
                    // 路径重写
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    }
})
