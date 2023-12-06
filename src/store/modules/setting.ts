// Layout组件配置的小仓库
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('settingStore', {
    state: () => {
        return {
            // 菜单折叠or收起
            fold: false,
            refresh: false,
        }
    },
})

export default useLayoutSettingStore
