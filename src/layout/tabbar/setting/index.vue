<template>
    <el-button type="primary" icon="Refresh" circle size="small" @click=""></el-button>
    <el-button type="primary" icon="FullScreen" circle size="small" @click=""></el-button>
    <el-button type="primary" icon="Setting" circle size="small" @click=""></el-button>
    <img src="/logo.png" style="width: 24; height: 24px; margin: 0px 10px" />
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="Setting"></script>

<style scoped></style>
