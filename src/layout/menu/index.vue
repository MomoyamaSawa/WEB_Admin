<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
            <template #title>
                <span>图标&nbsp;</span>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有子路由 -->
        <el-sub-menu v-if="item.children && !item.meta.hidden" :index="item.path">
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts" name="Menu">
// 上面写了名字递归用
// 获取父组件传递过来的全部路由数组
defineProps(['menuList'])
</script>

<style scoped lang="scss"></style>
