// 路由鉴权

import router from '@/router'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'

let userStore = useUserStore(pinia)
console.log(userStore)

// 全局前置守卫
router.beforeEach((to, from, next) => {
    nprogress.start()
    document.title = `${setting.title} - ${to.meta.title}`
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
                        userStore.userLogout()
                        next({ path: '/login', query: { redirect: to.path } })
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
    next()
})

// 全局后置守卫
router.afterEach((to, from) => {
    nprogress.done()
})
