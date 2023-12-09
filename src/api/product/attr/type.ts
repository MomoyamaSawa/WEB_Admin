export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface Categoryobj {
    id: number | string
    name: string
    category1Id?: number
    category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
    data: Categoryobj[]
}

export interface AttrValue {
    id?: number
    valueName: string
    attrId?: number
    flag?: boolean
}

export type AttrValueList = AttrValue[]

export interface Attr {
    id?: number
    attrName: string
    categoryId: number | string
    categoryLevel: number
    attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
    data: AttrList
}
