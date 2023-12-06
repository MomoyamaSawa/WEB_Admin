<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            v-show="item.meta.title"
            :to="item.path"
        >
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import useLayoutSettingStore from '@/store/modules/setting'
// 控制图标切换
let layoutSettingStore = useLayoutSettingStore()
const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<style scoped></style>
