import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
let userCategoryStore = defineStore('Category', {
    state: () => {
        return {
            c1Arr: [],
            c2Arr: [],
            c3Arr: [],
            c1Id: '',
        }
    },
    getters: {},
    actions: {
        getC1() {
            reqC1().then((res: any) => {
                this.c1Arr = res.data
            })
        },
    },
})

export default userCategoryStore
