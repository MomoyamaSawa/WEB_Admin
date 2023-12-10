/**
 * SPU管理的接口
 */
import request from '@/utils/request'
import type {
    HasSpuResponseData,
    ALLTradeMarkResponseData,
    SpuImageResponseData,
    SpuSaleAttrResponseData,
    HasSaleAttrResponseData,
} from './type'
// API 枚举,
enum API {
    // 获取已有的 SPU 数据
    HASSPU_URL = '/admin/product/',
    // 获取全部品牌的数据
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    // 获取SPU下照片墙
    IMAGE_URL = '/admin/product/spuImageList/',
    // 获取SPU销售属性
    SPUHASSALEATTR = '/admin/product/spuSaleAttrList/',
    // 获取真个项目全部销售属性
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
}

export const reqHasSPU = (page: number, limit: number, category3Id: string | number) =>
    request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}/?category3Id=${category3Id}`)

export const reqAllTrademark = () => request.get<any, ALLTradeMarkResponseData>(API.ALLTRADEMARK_URL)

export const reqSpuImageList = (spuId: number) => request.get<any, SpuImageResponseData>(API.IMAGE_URL + spuId)

export const reqSpuSaleAttrList = (spuId: number) =>
    request.get<any, SpuSaleAttrResponseData>(API.SPUHASSALEATTR + spuId)

export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
