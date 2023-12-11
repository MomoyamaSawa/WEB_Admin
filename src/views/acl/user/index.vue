<template>
    <el-card style="height: 80px">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input placeholder="搜索用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="">搜索</el-button>
                <el-button type="primary" size="default" @click="">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px">
        <el-button type="primary" size="default" @click="">添加用户</el-button>
        <el-button type="primary" size="default" @click="">批量删除</el-button>
        <!-- 表格展示用户信息 -->
        <el-table style="margin: 10px 0px" border>
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center"></el-table-column>
            <el-table-column label="用户名" align="center"></el-table-column>
            <el-table-column label="用户名称" align="center"></el-table-column>
            <el-table-column label="角色" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center"></el-table-column>
            <el-table-column label="更新时间" align="center"></el-table-column>
            <el-table-column label="操作" width="260px" align="center"></el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[5, 7, 9, 11]"
            :background="true"
            layout="prev, pager, next, jumper,->,total, sizes"
            :total="400"
            @size-change=""
            @current-change=""
        />
    </el-card>
</template>

<script setup lang="ts" name="User">
import { ref } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
