// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type { loginFormData, loginResponseData, userInfoReponseData } from '@/api/user/type'
import type { UserStateData } from './types/types'
import { getToken, setToken, removeToken } from '@/utils/token'
// 引入路由
import { constRoutes, asnyRoutes, anyRoutes } from '@/router/routes'
import router from '@/router'
// 引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep'

// 过滤当前用户需要展示的一异步路由
function filyerAsyncRoutes(asnycRoute: any, routes: any) {
    return asnycRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                //硅谷333账号:product\trademark\attr\sku
                item.children = filyerAsyncRoutes(item.children, routes)
            }
            return true
        }
    })
}

// 创建用户小仓库
let useUserStore = defineStore('user', {
    state: (): UserStateData => {
        return {
            token: getToken(),
            menuRoutes: constRoutes,
            username: '',
            avatar: '',
            buttons: [],
        }
    },
    actions: {
        // 用户登录
        async userLogin(data: loginFormData) {
            let result: loginResponseData = await reqLogin(data)
            // 登陆成功：token
            if (result.code === 200) {
                this.token = result.data || null
                // 本地持久化存储一份
                setToken(this.token)
                // 保证当前async函数返回一个成功的promise
                return Promise.resolve()
            }
            // 登陆失败：错误的信息
            else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 获取用户信息存到仓库里
        async userInfo() {
            let result: userInfoReponseData = await reqUserInfo()
            if (result.code === 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                this.buttons = result.data.buttons
                console.log(this.username)
                // 生成静态页面的动态路由，深拷贝，别把原本的改了
                let userAsyncRoutes = filyerAsyncRoutes(cloneDeep(asnyRoutes), result.data.routes)
                this.menuRoutes = [...constRoutes, ...userAsyncRoutes, ...anyRoutes]
                // 目前路由器管理的只有常量路由：用户计算完毕异步路由、任意路由动态追加
                let addRoutes = [...userAsyncRoutes, anyRoutes]
                console.log(addRoutes)
                addRoutes.forEach((route: any) => {
                    router.addRoute(route)
                })
                return Promise.resolve()
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 退出登录
        async userLogout() {
            let result: any = await reqLogout()
            this.token = null
            this.username = ''
            this.avatar = ''
            removeToken()
            if (result.code === 200) {
                return Promise.resolve()
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
    },
    getters: {},
})

export default useUserStore
