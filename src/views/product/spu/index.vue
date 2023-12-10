<template>
    <!-- 三级分类结构 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
        <div v-show="scene == 0">
            <el-button
                type="primary"
                size="default"
                icon="Plus"
                @click="addSPU"
                :disabled="categoryStore.c3Id ? false : true"
            >
                添加SPU
            </el-button>
            <el-table :data="records" style="margin: 10px 0px" border show-overflow-tooltip>
                <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                <el-table-column prop="spuName" label="SPU名称" width="180"></el-table-column>
                <el-table-column prop="description" label="SPU描述"></el-table-column>
                <el-table-column prop="" label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="default" icon="Plus" @click="" title="添加SKU"></el-button>
                        <el-button type="primary" size="default" icon="Edit" @click="" title="修改SKU"></el-button>
                        <el-button type="primary" size="default" icon="View" @click="" title="查看SKU列表"></el-button>
                        <el-button type="primary" size="default" icon="Delete" @click="" title="删除SKU"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[3, 5, 7, 9]"
                :background="true"
                layout="prev, pager, next, jumper, -> ,sizes,total"
                :total="total"
                @size-change="changeSize"
                @current-change="getHasSpu"
            />
        </div>
        <!-- 添加/修改SPU -->
        <SpuForm v-show="scene == 1" @changeScene="changeScene"></SpuForm>
        <!-- 添加/修改SKU -->
        <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
</template>

<script setup lang="ts" name="SPU">
import { ref, watch } from 'vue'
import { reqHasSPU } from '@/api/product/spu'
import { HasSpuResponseData, Records } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
const scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let categoryStore = useCategoryStore()
let records = ref<Records>([])
let total = ref<number>(0)
// 监听三级分类的变化
watch(
    () => categoryStore.c3Id,
    () => {
        // 务必保证有三级分类ID
        if (!categoryStore.c3Id) return
        getHasSpu()
    },
)
const getHasSpu = (page = 1) => {
    pageNo.value = page
    reqHasSPU(pageNo.value, pageSize.value, categoryStore.c3Id).then((res: HasSpuResponseData) => {
        console.log(res)
        records.value = res.data.records
        total.value = res.data.total
    })
}
const changeSize = () => {
    getHasSpu()
}

// SPU页面
const addSPU = () => {
    scene.value = 1
}
const changeScene = (sceneNo: number) => {
    scene.value = sceneNo
}
</script>

<style scoped lang="scss"></style>
