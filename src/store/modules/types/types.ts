import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库数据 state 的类型
export interface UserStateData {
    token: string | null
    menuRoutes: RouteRecordRaw[]
    username: string
    avatar: string
}

// 定义分类仓库 state 对象的 ts 类型
import type { Categoryobj } from '@/api/product/attr/type'
export interface CategoryStateData {
    c1Arr: Categoryobj[]
    c2Arr: Categoryobj[]
    c3Arr: Categoryobj[]
    c1Id: string | number
    c2Id: string | number
    c3Id: string | number
}
