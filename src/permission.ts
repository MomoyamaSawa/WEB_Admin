// 路由鉴权

import router from '@/router'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'

let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach((to, from, next) => {
    nprogress.start()
    let token = userStore.token
    if (token) {
        if (to.path === '/login') {
            next('/')
        } else {
            let username = userStore.username
            if (username) {
                next()
            } else {
                userStore
                    .userInfo()
                    .then(() => {
                        next()
                    })
                    .catch(() => {
                        // token过期 || 用户手动修改token
                        userStore.userLogout().finally(() => {
                            next({ path: '/login', query: { redirect: to.path } })
                        })
                    })
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})

// 全局后置守卫
router.afterEach((to, from) => {
    document.title = `${setting.title} - ${to.meta.title}`
    nprogress.done()
})
