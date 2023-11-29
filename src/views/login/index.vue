<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-from class="login_from">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item>
                        <el-input
                            :prefix-icon="User"
                            v-model="loginInfo.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            :prefix-icon="Lock"
                            v-model="loginInfo.password"
                            type="password"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="login_btn"
                            type="primary"
                            size="default"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-from>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'
// 收集账号与表单数据
let loginInfo = reactive({
    username: 'admin',
    password: '111111',
})
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
}

.login_from {
    display: block;
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
