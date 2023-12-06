<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
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
