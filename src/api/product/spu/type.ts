export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface SpuData {
    id?: number
    spuName: string
    description: string
    category3Id: number | string
    tmId: number | string
    spuSaleAttrList: null | SaleAttr[]
    spuImageList: null | SpuImage[]
}

export type Records = SpuData[]

export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        pages: number
        serchCount: boolean
    }
}

export interface TradeMark {
    id: number
    tmName: string
    logoUrl: string
}

export interface ALLTradeMarkResponseData extends ResponseData {
    data: TradeMark[]
}

export interface SpuImage {
    id?: number
    imgName?: string
    imgUrl?: string
    createTime?: string
    updateTime?: string
    spuId?: number
    name?: string
    url?: string
}

export interface SpuImageResponseData extends ResponseData {
    data: SpuImage[]
}

export interface SaleAttrValue {
    id?: number
    spuId?: number
    createTime?: string
    updateTime?: string
    baseSaleAttrId: number | string
    saleAttrValueName: string
    saleAttrName?: string
    isChecked?: null
}

export type spuSaleAttrList = SaleAttrValue[]

export interface SaleAttr {
    id?: number
    createTime?: string
    updateTime?: string
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrName: string
    spuSaleAttrValueList: spuSaleAttrList
    flag?: boolean
    saleAttrValue?: string
}

export interface SpuSaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}

export interface HasSaleAttr {
    id: number
    name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}

export interface Attr {
    attrId: number | string //平台属性的ID
    valueId: number | string //属性值的ID
}

export interface saleArr {
    saleAttrId: number | string //属性ID
    saleAttrValueId: number | string //属性值的ID
}

export interface SkuData {
    category3Id: string | number //三级分类的ID
    spuId: string | number //已有的SPU的ID
    tmId: string | number //SPU品牌的ID
    skuName: string //sku名字
    price: string | number //sku价格
    weight: string | number //sku重量
    skuDesc: string //sku的描述
    skuAttrValueList?: Attr[]
    skuSaleAttrValueList?: saleArr[]
    skuDefaultImg: string //sku图片地址
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}
