<template>
    <el-card class="box-card">
        <!-- 添加品牌按钮 -->
        <el-button icon="Plus" type="primary" size="default" @click="">添加品牌</el-button>
        <!-- 表格组件，用于展示品牌信息 -->
        <el-table style="margin: 10px 0px" border>
            <el-table-column label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="品牌名称"></el-table-column>
            <el-table-column label="品牌LOGO"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5, 7, 9]"
            :small="true"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change=""
            @current-change=""
        />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
</script>

<style scoped lang="scss"></style>
