<template>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
        <div v-show="scene == 0">
            <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id ? false : true" @click="addAttr">
                添加属性
            </el-button>
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
                        <el-button type="primary" size="small" icon="Edit" @click="updateAttr"></el-button>
                        <el-button type="danger" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加属性和修改属性的结构 -->
        <div v-show="scene == 1">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input placeholder="请输入属性名"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="default" icon="Plus" @click="">添加属性值</el-button>
            <el-table border style="margin: 10px 0px">
                <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                <el-table-column label="属性值名称"></el-table-column>
                <el-table-column label="属性值操作"></el-table-column>
            </el-table>
            <el-button type="primary" size="default" @click="">保存</el-button>
            <el-button size="default" @click="cancel">取消</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts" name="Attr">
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

import { watch, reactive, ref } from 'vue'
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

// 控制卡片内容切换
let scene = ref<number>(1)
const addAttr = () => {
    scene.value = 1
}
const updateAttr = () => {
    scene.value = 1
}
const cancel = () => {
    scene.value = 0
}
</script>

<style scoped lang="scss"></style>
