<template>
    <el-card class="box-card">
        <!-- 添加品牌按钮 -->
        <el-button icon="Plus" type="primary" size="default" @click="">添加品牌</el-button>
        <!-- 表格组件，用于展示品牌信息 -->
        <el-table style="margin: 10px 0px" border :data="trademarkArr">
            <!-- 默认展示数据用插槽，可以用插槽定义展示结构样式了 -->
            <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO" prop="logoUrl">
                <template #="{ row }">
                    <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #>
                    <el-button type="primary" size="small" icon="Edit" @click=""></el-button>
                    <el-button type="primary" size="small" icon="Delete" @click=""></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5, 7, 9]"
            :small="true"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change=""
            @current-change=""
        />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页显示的条数
let pageSize = ref<number>(3)

/**
 * 根据页获取已有品牌列表 & 初始化
 */
import { reqTrademarkList } from '@/api/product/trademark'
import { onMounted } from 'vue'
let total = ref<number>(0)
let trademarkArr = ref<any[]>([])
const gettrademarkList = () => {
    reqTrademarkList(pageNo.value, pageSize.value).then((res) => {
        total.value = res.data.total
        trademarkArr.value = res.data.records
    })
}
onMounted(() => {
    gettrademarkList()
})
</script>

<style scoped lang="scss"></style>
