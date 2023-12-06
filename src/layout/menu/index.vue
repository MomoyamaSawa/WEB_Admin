<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children && item.meta.show" :index="item.path" @click="goRoute">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有子路由 -->
        <!-- 显示根 -->
        <el-sub-menu v-if="item.children && item.meta.show" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
        <!-- 不显示根 -->
        <template v-if="item.children && !item.meta.show">
            <Menu :menuList="item.children"></Menu>
        </template>
    </template>
</template>

<script setup lang="ts" name="Menu">
// 上面写了名字递归用
import { useRouter } from 'vue-router'
// 获取父组件传递过来的全部路由数组
defineProps(['menuList'])
// 点击菜单的回调
let $router = useRouter()
const goRoute = (menuItem: any) => {
    $router.push(menuItem.index)
}
</script>

<style scoped lang="scss"></style>
