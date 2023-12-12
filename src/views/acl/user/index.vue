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
                    <el-button type="warning" size="small" icon="User" @click="setRoler(row)">分配角色</el-button>
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
    <!-- 抽屉结构 用户新增和修改 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <template #default>
            <el-form ref="form" :rules="rules" :model="userParams">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
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
    <!-- 抽屉结构 职位分配 -->
    <el-drawer v-model="drawer1">
        <template #header>
            <h4>分配用户角色</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label-width="80px" label="用户名" v-model="userParams.username">
                    <el-input v-model="userParams.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label-width="80px" label="职位列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                        全选
                    </el-checkbox>
                    <el-checkbox-group v-model="userRoleId" @change="handleChecked">
                        <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role.id">
                            {{ role.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer1 = false">取消</el-button>
                <el-button type="primary" @click="confirmRoleClick">确认</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts" name="User">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole } from '@/api/acl/user'
import type { UserResponseData, Records, User, AllRole, AllRoleResponseData, SetRoleData } from '@/api/acl/user/type'
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
        id: 0,
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
    // 数据清空
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: '',
    })
    // 清除警告捏
    nextTick(() => {
        form.value.clearValidate()
    })
    drawer.value = true
    Object.assign(userParams, row)
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
                    ElMessage.success('成功')
                    // 浏览器自动刷新，就看看是不是把自己账号信息改
                    window.location.reload()
                })
                .catch((err: any) => {
                    ElMessage.error('失败')
                })
        })
        .catch((err: any) => {
            return
        })
}
const cancelClick = () => {
    drawer.value = false
}

// 分配角色
let drawer1 = ref<boolean>(false)
const setRoler = (row: User) => {
    Object.assign(userParams, row)
    // 获取所有角色
    reqAllRole(userParams.id as number)
        .then((res: AllRoleResponseData) => {
            allRole.value = res.data.allRolesList
            userRole.value = res.data.assignRoles
            drawer1.value = true
            // 赋值 ID 数组
            allRoleId.value = allRole.value.map((role) => role.id as number)
            userRoleId.value = userRole.value.map((role) => role.id as number)
            if (userRoleId.value.length === allRoleId.value.length) {
                console.log('全选')
                checkAll.value = true
                isIndeterminate.value = false
            } else if (userRoleId.value.length > 0) {
                checkAll.value = false
                isIndeterminate.value = true
            } else {
                checkAll.value = false
                isIndeterminate.value = false
            }
        })
        .catch((err: any) => {
            ElMessage.error('失败')
        })
}
let checkAll = ref<boolean>(false)
const isIndeterminate = ref(false)
const handleCheckAllChange = (val: any) => {
    userRoleId.value = val ? allRoleId.value : []
    userRole.value = allRole.value.filter((role) => userRoleId.value.includes(role.id as number))
    isIndeterminate.value = false
}

let allRole = ref<AllRole>([])
let userRole = ref<AllRole>([])
let allRoleId = ref<number[]>([])
let userRoleId = ref<number[]>([])
const handleChecked = (value: any) => {
    userRoleId.value = value
    userRole.value = allRole.value.filter((role) => userRoleId.value.includes(role.id as number))
    if (userRoleId.value.length === allRoleId.value.length) {
        checkAll.value = true
        isIndeterminate.value = false
    } else if (userRoleId.value.length > 0) {
        checkAll.value = false
        isIndeterminate.value = true
    } else {
        checkAll.value = false
        isIndeterminate.value = false
    }
}

const confirmRoleClick = () => {
    let data: SetRoleData = {
        userId: userParams.id as number,
        roleIdList: userRoleId.value,
    }
    reqSetUserRole(data)
        .then((res: SetRoleData) => {
            drawer1.value = false
            ElMessage.success('成功')
            getHasuser(pageNo.value)
        })
        .catch((err: any) => {
            ElMessage.error('失败')
        })
}
</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
