<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="" class="avatar" />
            <div class="bottom">
                <h3 class="title">{{ getTime() + '好鸭，' + userStore.username }}</h3>
                <p class="sub">欢迎来到后台管理系统</p>
            </div>
        </div>
    </el-card>
    <div class="bottoms">
        <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
</template>

<script setup lang="ts" name="Home">
// 引入用户相关仓库
import userUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
let userStore = userUserStore()
</script>

<style scoped lang="scss">
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .bottom {
        margin-top: 10px;
        margin-left: 20px;

        .title {
            font-size: 30px;
            font-weight: 900;
            margin-bottom: 30px;
        }

        .sub {
            font-style: italic;
            color: dimgray;
        }
    }
}

.bottoms {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
</style>
