<template>
    <div class="logo" v-if="setting.logoShow">
        <img :src="setting.logo" alt="logo" />
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts" name="Logo">
// 引入配置文件
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        margin-left: 10px;
        font-size: $base-logo-title-fontsize;
    }
}
</style>
