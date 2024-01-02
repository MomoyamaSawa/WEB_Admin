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
    console.log('to', to)
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
                        // 刷新的时候是异步路由，获取到用户信息，动态加载的异步路由还没有加载完毕，出现空白效果，（router种记录了信息，但是组件还没准备好）所以加一个等待加载完毕，这个地方这句话的功能详见：https://juejin.cn/post/7100910253675544583，加了这个参数好像就会检查组件加载完没有。
                        next({ ...to })
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
