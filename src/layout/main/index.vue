<template>
    <!-- 路由组件出口位置 -->
    <router-view v-slot="{ Component }">
        <transition name="fade" v-if="flag">
            <div>
                <component :is="Component"></component>
            </div>
        </transition>
    </router-view>
</template>

<script setup lang="ts" name="Main">
import { watch, ref, nextTick } from 'vue'
import userLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = userLayoutSettingStore()
// 控制当前组件是否销毁重建
let flag = ref(true)
// 监听仓库内部刷新数据是否发生变化
watch(
    () => layoutSettingStore.refresh,
    (value) => {
        if (value) {
            flag.value = false
            // 更新完以后下一个渲染周期再让他回来，v-if是会销毁的
            nextTick(() => {
                flag.value = true
            })
        }
    },
)
</script>

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
