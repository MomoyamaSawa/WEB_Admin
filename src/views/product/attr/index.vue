<template>
    <!-- 三级分类全局组件 -->
    <Category></Category>
    <el-card style="margin: 10px 0px">
        <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>
        <el-table style="margin=10px 0px">
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="属性名称" width="120px"></el-table-column>
            <el-table-column label="属性值"></el-table-column>
            <el-table-column label="操作" width="120px"></el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts" name="Attr">
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
</script>

<style scoped lang="scss"></style>
