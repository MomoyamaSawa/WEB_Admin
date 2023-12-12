<template>
    <el-table :data="permissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作">
            <template #default="{ row, $index }">
                <el-button type="primary" size="small" @click="" :disabled="row.level == 4 ? true : false">
                    {{ row.level == 3 ? '添加功能' : '添加菜单' }}
                </el-button>
                <el-button type="primary" size="small" @click="" :disabled="row.level == 1 ? true : false">
                    编辑
                </el-button>
                <el-button type="danger" size="small" @click="" :disabled="row.level == 1 ? true : false">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts" name="Permission">
import { ref, onMounted } from 'vue'
import { reqAllPermisstion } from '@/api/acl/menu'
import type { PermisstionResponseData, PermisstionList } from '@/api/acl/menu/type'
// 初始化
onMounted(() => {
    getHasPermission()
})
let permissionArr = ref<PermisstionList>([])
const getHasPermission = () => {
    reqAllPermisstion().then((res: PermisstionResponseData) => {
        permissionArr.value = res.data
    })
}
</script>

<style scoped lang="scss"></style>
