<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有子路由 -->
        <el-sub-menu v-if="item.children && !item.meta.hidden" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
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
// 点击菜单的回调
const goRoute = (vc: any) => {
    console.log(vc.index)
}
</script>

<style scoped lang="scss"></style>
