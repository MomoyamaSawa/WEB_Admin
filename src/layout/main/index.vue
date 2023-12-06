<template>
    <!-- 路由组件出口位置 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component"></component>
        </transition>
    </router-view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: 0.3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>
