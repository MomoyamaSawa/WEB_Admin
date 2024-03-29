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
    SpuData,
    SkuInfoData,
    SkuData,
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
    // 追加一个新的SPu
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    // 更新已有的SPU
    UPPDATESPU_URL = '/admin/product/updateSpuInfo',
    //追加一个新增的SKU地址
    ADDSKU_URL = '/admin/product/saveSkuInfo',
    //查看某一个已有的SPU下全部售卖的商品
    SKUINFO_URL = '/admin/product/findBySpuId/',
    //删除已有的SPU
    REMOVESPU_URL = '/admin/product/deleteSpu/',
}

export const reqHasSPU = (page: number, limit: number, category3Id: string | number) =>
    request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}/?category3Id=${category3Id}`)

export const reqAllTrademark = () => request.get<any, ALLTradeMarkResponseData>(API.ALLTRADEMARK_URL)

export const reqSpuImageList = (spuId: number) => request.get<any, SpuImageResponseData>(API.IMAGE_URL + spuId)

export const reqSpuSaleAttrList = (spuId: number) =>
    request.get<any, SpuSaleAttrResponseData>(API.SPUHASSALEATTR + spuId)

export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)

export const reqAddORUpdateSpu = (data: SpuData) => {
    if (data.id) {
        return request.post<any, any>(API.UPPDATESPU_URL, data)
    } else {
        return request.post<any, any>(API.ADDSPU_URL, data)
    }
}
//添加SKU的请求方法
export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data)

//获取SKU数据
export const reqSkuList = (spuId: number | string) => request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)

//删除已有的SPU
export const reqRemoveSpu = (spuId: number | string) => request.delete<any, any>(API.REMOVESPU_URL + spuId)
