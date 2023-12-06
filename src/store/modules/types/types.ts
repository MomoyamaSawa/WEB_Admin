import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库数据 state 的类型
export interface UserStateData {
    token: string | null
    menuRoutes: RouteRecordRaw[]
}
