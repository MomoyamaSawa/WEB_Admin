<template>
    <div>
        <h1>展示页</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 首页挂载完毕发请求获取用户信息
onMounted(() => {
    userStore.userInfo()
})
</script>

<style scoped></style>
