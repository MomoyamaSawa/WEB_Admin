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
        <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
        <el-button type="danger" size="default" @click="">批量删除</el-button>
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
                    <el-button type="primary" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
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
    <!-- 抽屉结构 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>添加用户</h4>
        </template>
        <template #default>
            <el-form ref="form" :rules="rules" :model="userParams">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts" name="User">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqUserInfo, reqAddOrUpdateUser } from '@/api/acl/user'
import type { UserResponseData, Records, User } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
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

// 抽屉
let drawer = ref<boolean>(false)
const validatorUsername = (rule: any, value: string, callback: any) => {
    if (value.trim().length <= 5) {
        return callback(new Error('用户名称至少5位'))
    }
    callback()
}
const validatorName = (rule: any, value: string, callback: any) => {
    if (value.trim().length <= 5) {
        return callback(new Error('用户昵称至少5位'))
    }
    callback()
}
const validatorPassword = (rule: any, value: string, callback: any) => {
    if (value.trim().length <= 6) {
        return callback(new Error('用户密码至少6位'))
    }
    callback()
}
const rules = {
    username: [{ required: true, validator: validatorUsername, trigger: 'blur' }],
    name: [{ required: true, validator: validatorName, trigger: 'blur' }],
    password: [{ required: true, validator: validatorPassword, trigger: 'blur' }],
}
let userParams = reactive<User>({
    username: '',
    name: '',
    password: '',
})
const addUser = () => {
    // 数据清空
    Object.assign(userParams, {
        username: '',
        name: '',
        password: '',
    })
    drawer.value = true
    // 清除警告捏
    nextTick(() => {
        form.value.clearValidate()
    })
}
const editUser = (row: User) => {
    drawer.value = true
}
let form = ref()
const confirmClick = () => {
    // 先进行校验
    form.value
        .validate()
        .then((res: any) => {
            reqAddOrUpdateUser(userParams)
                .then((res: any) => {
                    drawer.value = false
                    ElMessage.success('添加成功')
                    getHasuser()
                })
                .catch((err: any) => {
                    ElMessage.error('添加失败')
                })
        })
        .catch((err: any) => {
            return
        })
}
const cancelClick = () => {
    drawer.value = false
}
</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
