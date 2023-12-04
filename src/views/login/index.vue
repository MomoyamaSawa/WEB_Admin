<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <!-- 登录表单 -->
                <el-form class="login_form" :model="loginInfo" :rules="rules" ref="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            :prefix-icon="Lock"
                            v-model="loginInfo.password"
                            type="password"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
// 引入用户小仓库
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入获取当前时间段的函数
import { getTime } from '@/utils/time'

// 用户相关的小仓库
let userStore = useUserStore()
// 变量控制按钮加载效果
let loading = ref(false)
// 获取路由器
let $router = useRouter()
// 收集账号与表单数据
let loginInfo = reactive({
    username: 'admin',
    password: '111111',
})
// 表单校验需要的配置对象
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    ],
}
// 获取表达组件
const login_form = ref()

/**
 * 登录函数
 */
const login = () => {
    // 保证全部表单项都通过校验
    login_form.value.validate().then(() => {
        // 开始加载效果
        loading.value = true
        // 通知仓库发登录请求
        userStore
            .userLogin(loginInfo)
            .then(() => {
                // 跳转到首页
                $router.push('/')
                ElNotification({
                    title: getTime() + '好',
                    message: '欢迎回来',
                    type: 'success',
                })
            })
            .catch((err) => {
                console.log(err)
                ElNotification({
                    title: '登录失败',
                    message: err.message,
                    type: 'error',
                })
            })
            .finally(() => {
                // 结束加载效果
                loading.value = false
            })
    })
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
}

.login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
        color: white;
        font-size: 40px;
    }

    h2 {
        margin: 20px 0px;
        color: white;
        font-size: 20px;
    }
}

.login_btn {
    width: 100%;
}
</style>
