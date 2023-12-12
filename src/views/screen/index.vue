<template>
    <div class="container">
        <!-- 数据大屏内容去 -->
        <div class="screen" ref="screen">
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="left">左侧</div>
                <div class="center">中间</div>
                <div class="right">右侧</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="Screen">
import { ref, onMounted } from 'vue'
import Top from './components/top/index.vue'
/**
 * 进行适配
 */
const screen = ref()
onMounted(() => {
    screen.value.style.transform = `translate(-50%, -50%) scale(${getScale()})`
})
// 定义缩放比例
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww > wh ? wh : ww
}
// 监听视口变化
window.onresize = () => {
    screen.value.style.transform = `translate(-50%, -50%) scale(${getScale()})`
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;

        .top {
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;

            .right {
                flex: 1;
                height: 100%;
            }

            .left {
                flex: 1;
                height: 100%;
            }

            .center {
                flex: 2;
                height: 100%;
            }
        }
    }
}
</style>
