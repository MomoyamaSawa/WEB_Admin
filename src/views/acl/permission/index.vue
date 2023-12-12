<template>
    <el-table :data="permissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作">
            <template #default="{ row, $index }">
                <el-button type="primary" size="small" @click="addPermission(row)"
                    :disabled="row.level == 4 ? true : false">
                    {{ row.level == 3 ? '添加功能' : '添加菜单' }}
                </el-button>
                <el-button type="primary" size="small" @click="editPermission(row)"
                    :disabled="row.level == 1 ? true : false">
                    编辑
                </el-button>
                <el-button type="danger" size="small" @click="" :disabled="row.level == 1 ? true : false">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加/更新已有菜单类型 -->
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'" width="30%">
        <el-form>
            <el-form-item label="名称">
                <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-input placeholder="请输入权限值" v-model="menuData.code"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts" name="Permission">
import { ref, onMounted, reactive } from 'vue'
import { reqAllPermisstion, reqAddOrUpdateMenu } from '@/api/acl/menu'
import type { PermisstionResponseData, PermisstionList, Permisstion } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus';
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
// 对话框
let dialogVisible = ref<boolean>(false)
const addPermission = (row: Permisstion) => {
    // 清空数据
    Object.assign(menuData, {
        id: 0,
        code: '',
        name: '',
        level: 0,
        pid: 0,
    })
    menuData.pid = row.id as number
    menuData.level = row.level + 1
    dialogVisible.value = true
}
const editPermission = (row: Permisstion) => {
    Object.assign(menuData, row)
    dialogVisible.value = true
}
let menuData = reactive({
    id: 0,
    code: '',
    name: '',
    level: 0,
    pid: 0,
})
const save = () => {
    reqAddOrUpdateMenu(menuData).then((res) => {
        getHasPermission()
        dialogVisible.value = false
        ElMessage.success('成功')
    }).catch((err) => {
        ElMessage.error('失败')
    })
}
const cancel = () => {
    dialogVisible.value = false
}
</script>

<style scoped lang="scss"></style>
