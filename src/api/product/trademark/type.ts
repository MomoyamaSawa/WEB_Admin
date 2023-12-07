export interface DesponseData {
    code: number
    message: string
    ok: boolean
    data: any
}

export interface TradeMark {
    id?: number
    tmName: string
    logoUrl: string
}

export type Records = TradeMark[]

export interface TradeMarkResponseData extends DesponseData {
    data: {
        records: Records
        total: number
        size: number
        pages: number
        current: number
        searchCount: boolean
    }
}
