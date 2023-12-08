import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryStateData } from '@/store/modules/types/types'
let useCategoryStore = defineStore('Category', {
    state: (): CategoryStateData => {
        return {
            c1Arr: [],
            c2Arr: [],
            c3Arr: [],
            c1Id: '',
            c2Id: '',
            c3Id: '',
        }
    },
    getters: {},
    actions: {
        getC1() {
            reqC1().then((res: CategoryResponseData) => {
                this.c1Arr = res.data
            })
        },
        getC2(category1Id: number | string) {
            reqC2(category1Id).then((res: CategoryResponseData) => {
                this.c2Arr = res.data
            })
        },
        getC3(category2Id: number | string) {
            reqC3(category2Id).then((res: CategoryResponseData) => {
                this.c3Arr = res.data
            })
        },
    },
})

export default useCategoryStore
