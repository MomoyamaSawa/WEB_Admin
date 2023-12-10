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
    tmId: number
    spuSaleAttrList: null
    spuImageList: null
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
    id: number
    createTime: string
    spuId: number
    updatetime: string
    imgName: string
    imgUrl: string
}

export interface SpuImageResponseData extends ResponseData {
    data: SpuImage[]
}

export interface SaleAttrValue {
    id?: number
    spuId: number
    createTime: string
    updateTime: string
    baseSaleAttrId: number
    sakeAttrValueName: string
    saleAttrName: string
    isChecked: null
}

export type spuSaleAttrList = SaleAttrValue[]

export interface SaleAattr extends ResponseData {
    id?: number
    createTime: string
    updateTime: string
    spuId: number
    baseSaleAttrId: number
    saleAttrName: string
    spuSaleAttrValueList: spuSaleAttrList
}

export interface SpuSaleAttrResponseData extends ResponseData {
    data: SaleAattr[]
}

export interface HasSaleAttr {
    id: number
    attrName: string
}

export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}
