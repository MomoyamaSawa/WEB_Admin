/**
 * SPU管理的接口
 */
import request from '@/utils/request'
import type { HasSpuResponseData } from './type'
// API 枚举
enum API {
    // 获取已有的 SPU 数据
    HASSPU_URL = '/admin/product/',
}

export const reqHasSPU = (page: number, limit: number, categoryId: string | number) =>
    request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}/?categoryId=${categoryId}`)
