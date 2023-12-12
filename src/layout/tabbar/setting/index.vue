<template>
    <el-button icon="Refresh" circle size="small" @click="updateRefresh"></el-button>
    <el-button icon="FullScreen" circle size="small" @click="fullScreen"></el-button>
    <el-popover placement="bottom" title="主题设置" :width="120" trigger="click">
        <el-form>
            <el-form-item label="暗黑模式">
                <el-switch
                    class="mt-2"
                    inline-prompt
                    v-model="value"
                    active-icon="MoonNight"
                    inactive-icon="Sunny"
                    @change="changeDark"
                />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button icon="Setting" circle size="small" @click=""></el-button>
        </template>
    </el-popover>
    <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%" />
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="Setting">
import userLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = userLayoutSettingStore()
// 刷新
const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏
const fullScreen = () => {
    // 可以用来判断当前是不是全屏
    let full = document.fullscreenElement
    // 切换全屏
    if (full) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
}

import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

// 退出登录
import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
const logout = () => {
    // 仓库中关于用户相关的数据清空
    userStore.userLogout().finally(() => {
        // 跳转到登陆页面，并且把当前页面的路径传递过去，登陆成功后跳转回来
        $router.push({ path: '/login', query: { redirect: $route.path } })
    })
}

// 颜色组件
import { ref } from 'vue'

let value = ref(false)
const changeDark = (val: any) => {
    // 获取根节点
    let root = document.documentElement
    // 判断html标签是否有类名dark
    val ? (root.className = 'dark') : (root.className = '')
}
</script>

<style scoped></style>
