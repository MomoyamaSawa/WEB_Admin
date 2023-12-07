/**
 * 品牌管理的接口
 */

import request from '@/utils/request'
// API 枚举
enum API {
    // 获取已有品牌
    TRADEMARD_URL = '/admin/product/baseTrademark/',
}

/**
 * 获取已有品牌的方法
 * page: 当前页码
 * limit: 每页显示条数
 */
export const reqTrademarkList = (page: number, limit: number) =>
    request.get<any, any>(API.TRADEMARD_URL + `${page}/${limit}`)
