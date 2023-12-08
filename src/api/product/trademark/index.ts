/**
 * 品牌管理的接口
 */

import request from '@/utils/request'
// API 枚举
enum API {
    // 获取已有品牌
    TRADEMARD_URL = '/admin/product/baseTrademark/',
    // 添加品牌
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    // 修改已有品牌
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    // 删除已有品牌
    DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

/**
 * 获取已有品牌的方法
 * @param page: 当前页码
 * @param limit: 每页显示条数
 */
import type { TradeMarkResponseData } from './type'
export const reqTrademarkList = (page: number, limit: number) =>
    request.get<any, TradeMarkResponseData>(API.TRADEMARD_URL + `${page}/${limit}`)

/**
 * 新增与修改品牌的方法
 */
import type { TradeMark } from './type'
export const reqAddOrUpdateTrademark = (trademark: TradeMark) => {
    if (trademark.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, trademark)
    } else {
        return request.post<any, any>(API.ADDTRADEMARK_URL, trademark)
    }
}
/**
 * 删除品牌的方法
 */
export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETETRADEMARK_URL + id)
