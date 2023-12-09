<template>
    <!-- 三级分类全局组件 -->
    <Category></Category>
    <el-card style="margin: 10px 0px">
        <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>
        <el-table border style="margin: 10px 0px" :data="attrArr.list">
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
            <el-table-column label="属性值">
                <template #default="{ row }">
                    <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">
                        {{ item.valueName }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120px">
                <template #default="{ row }">
                    <el-button type="primary" size="small" icon="Edit"></el-button>
                    <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts" name="Attr">
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

import { watch, reactive } from 'vue'
import { reqAttr } from '@/api/product/attr'
import type { AttrResponseData, AttrList } from '@/api/product/attr/type'
let attrArr = reactive({ list: [] as AttrList })
watch(
    () => categoryStore.c3Id,
    (newVal, oldVal) => {
        // 清空数据
        attrArr.list = []
        // 保证三级分类有
        if (!newVal) return
        const { c3Id, c2Id, c1Id } = categoryStore
        reqAttr(c1Id, c2Id, c3Id).then((res: AttrResponseData) => {
            attrArr.list = res.data
        })
    },
)
</script>

<style scoped lang="scss"></style>
