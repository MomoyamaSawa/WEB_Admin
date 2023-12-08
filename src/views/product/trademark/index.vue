<template>
    <el-card class="box-card">
        <!-- 添加品牌按钮 -->
        <el-button icon="Plus" type="primary" size="default" @click="addTrademark">添加品牌</el-button>
        <!-- 表格组件，用于展示品牌信息 -->
        <el-table style="margin: 10px 0px" border :data="trademarkArr">
            <!-- 默认展示数据用插槽，可以用插槽定义展示结构样式了 -->
            <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO" prop="logoUrl">
                <template #="{ row }">
                    <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #>
                    <el-button type="primary" size="small" icon="Edit" @click="updateTrademark"></el-button>
                    <el-button type="primary" size="small" icon="Delete" @click=""></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5, 7, 9]"
            :small="true"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="sizeChange"
            @current-change="changePageNo"
        />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="isShowDialog" icon="" title="添加品牌">
        <el-form style="width: 80%">
            <el-form-item label-width="80px" label="品牌名称">
                <el-input placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label-width="80px" label="品牌LOGO">
                <el-upload
                    class="avatar-uploader"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script setup lang="ts" name="Trademark">
import { ref } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页显示的条数
let pageSize = ref<number>(3)

/**
 * 根据页获取已有品牌列表 & 初始化
 */
import { reqTrademarkList } from '@/api/product/trademark'
import { onMounted } from 'vue'
import type { Records, TradeMarkResponseData } from '@/api/product/trademark/type.ts'
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
const getTrademarkList = () => {
    reqTrademarkList(pageNo.value, pageSize.value).then((res: TradeMarkResponseData) => {
        total.value = res.data.total
        trademarkArr.value = res.data.records
    })
}
onMounted(() => {
    getTrademarkList()
})

/**
 * 页码改变时触发
 */
const changePageNo = () => {
    getTrademarkList()
}
const sizeChange = () => {
    // 页码改变时，重置为第一页
    pageNo.value = 1
    getTrademarkList()
}

/**
 * 控制对话框
 */
let isShowDialog = ref<boolean>(false)
const addTrademark = () => {
    isShowDialog.value = true
}
const updateTrademark = () => {
    isShowDialog.value = true
}
const cancel = () => {
    isShowDialog.value = false
}
const confirm = () => {
    isShowDialog.value = false
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style lang="scss">
// 这边要给子组件用的
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
