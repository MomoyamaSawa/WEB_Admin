// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入数据类型
import type { loginFormData, loginResponseData } from '@/api/user/type'
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
            // 登陆成功：token
            if (result.code === 200) {
                this.token = result.data.token || null
                // 本地持久化存储一份
                setToken(this.token)
                // 保证当前async函数返回一个成功的promise
                return Promise.resolve()
            }
            // 登陆失败：错误的信息
            else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        // 获取用户信息存到仓库里
        async userInfo() {
            let result = await reqUserInfo()
            console.log(result)
            if (result.code === 200) {
                this.username = result.data.checkUser.username
                this.avatar = result.data.checkUser.avatar
            }
        },
        // 退出登录
        userLogout() {
            this.token = null
            this.username = ''
            this.avatar = ''
            removeToken()
        },
    },
    getters: {},
})

export default useUserStore
