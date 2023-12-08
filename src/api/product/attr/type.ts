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
