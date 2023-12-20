// 注意这不是 vue 管理的，所以要引入 pinia
import pinia from '@/store'
import useUserStore from '@/store/modules/user'

let userStore = useUserStore(pinia)

// 自定义指令，就不用每个地方都去引仓库了
export const isHasButton = (app: any) => {
    app.directive('has', {
        // 代表使用了这个指令的元素的 dom 挂载后执行什么操作
        mounted(el: any, options: any) {
            if (userStore.buttons.includes(options.value)) {
                el.parentNode.removeChild(el)
            }
        },
    })
}
