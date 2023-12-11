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
        <el-table style="margin: 10px 0px" border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="#" align="center"></el-table-column>
            <el-table-column label="用户名" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button type="warning" size="small" icon="User" @click="">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="">编辑</el-button>
                    <el-button type="danger" size="small" icon="Delete" @click="">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[5, 7, 9, 11]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @size-change="handler"
            @current-change="getHasuser"
        />
    </el-card>
</template>

<script setup lang="ts" name="User">
import { ref, onMounted } from 'vue'
import { reqUserInfo } from '@/api/acl/user'
import type { UserResponseData, Records } from '@/api/acl/user/type'
// 初始化
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])
onMounted(() => {
    getHasuser()
})
const getHasuser = (pageNo = 1) => {
    reqUserInfo(pageNo, pageSize.value).then((res: UserResponseData) => {
        userArr.value = res.data.records
        total.value = res.data.total
    })
}
const handler = () => {
    getHasuser()
}
</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
