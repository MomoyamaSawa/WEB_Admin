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
                <el-table-column prop="" label="操作" width="280">
                    <template #="{ row, $index }">
                        <el-button
                            type="primary"
                            size="default"
                            icon="Plus"
                            @click="addSku(row)"
                            title="添加SKU"
                        ></el-button>
                        <el-button
                            type="primary"
                            size="default"
                            icon="Edit"
                            @click="updateSPU(row)"
                            title="修改SKU"
                        ></el-button>
                        <el-button
                            type="primary"
                            size="default"
                            icon="View"
                            @click="findSku(row)"
                            title="查看SKU列表"
                        ></el-button>
                        <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                            <template #reference>
                                <el-button type="primary" icon="Delete" title="删除SPU"></el-button>
                            </template>
                        </el-popconfirm>
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
        <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
        <!-- 添加/修改SKU -->
        <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
        <!-- dialog对话框:展示已有的SKU数据 -->
        <el-dialog v-model="show" title="SKU列表">
            <el-table border :data="skuArr">
                <el-table-column label="标题" prop="skuName"></el-table-column>
                <el-table-column label="价格" prop="price"></el-table-column>
                <el-table-column label="重量" prop="weight"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
</template>

<script setup lang="ts" name="SPU">
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqHasSPU, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
import type { SkuData, SkuInfoData, HasSpuResponseData, Records } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
import type { SpuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
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
    spu.value.initAddSpu(categoryStore.c3Id)
}
const changeScene = (obj: any) => {
    scene.value = obj.flag
    if (obj.params == 'update') {
        getHasSpu(pageNo.value)
    } else if (obj.params == 'add') {
        getHasSpu()
    }
}
// 获取子组件
let spu = ref()
const updateSPU = (row: SpuData) => {
    scene.value = 1

    // 调用子组件方法
    spu.value.initHasSpuData(row)
}

// 追加sku
//获取子组件实例SkuForm
let sku = ref<any>()
//存储全部的SKU数据
let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)
const addSku = (row: SpuData) => {
    //点击添加SKU按钮切换场景为2
    scene.value = 2
    //调用子组件的方法初始化添加SKU的数据
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
//查看SKU列表的数据
const findSku = async (row: SpuData) => {
    let result: SkuInfoData = await reqSkuList(row.id as number)
    if (result.code == 200) {
        skuArr.value = result.data
        //对话框显示出来
        show.value = true
    }
}

//删除已有的SPU按钮的回调
const deleteSpu = async (row: SpuData) => {
    let result: any = await reqRemoveSpu(row.id as number)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        //获取剩余SPU数据
        getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败',
        })
    }
}

//路由组件销毁前，情况仓库关于分类的数据
onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
