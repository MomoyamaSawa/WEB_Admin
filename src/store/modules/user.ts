// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type { loginFormData, loginResponseData, userInfoReponseData } from '@/api/user/type'
import type { UserStateData } from './types/types'
import { getToken, setToken, removeToken } from '@/utils/token'
// 引入路由
import { constRoutes } from '@/router/routes'

let useUserStore = defineStore('user', {
    state: (): UserStateData => {
        return {
            token: getToken(),
            menuRoutes: constRoutes,
            username: '',
            avatar: '',
        }
    },
    actions: {
        // 用户登录
        async userLogin(data: loginFormData) {
            let result: loginResponseData = await reqLogin(data)
            console.log(result)
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
            console.log(result)
            if (result.code === 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
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
