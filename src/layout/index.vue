<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">数据大屏</el-menu-item>
                    <el-sub-menu index="3">
                        <template #title>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="3-1">用户管理</el-menu-item>
                        <el-menu-item index="3-1">角色管理</el-menu-item>
                        <el-menu-item index="3-1">菜单管理</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">213</div>
        <!-- 内容区域 -->
        <div class="layout_main">213</div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-bg;

        .scrollbar {
            width: 100%;
            height: calc(100vh - #{$base-menu-logo-height});
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - #{$base-menu-width});
        height: $base-tabbar-height;
        background: cyan;
        top: 0px;
        left: $base-menu-width;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - #{$base-menu-width});
        height: calc(100vh - #{$base-tabbar-height});
        background: yellow;
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        // 滚动条
        overflow: auto;
    }
}
</style>
