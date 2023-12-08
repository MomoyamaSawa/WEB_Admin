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
                <el-input v-model="trademarkparams.tmName" placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label-width="80px" label="品牌LOGO">
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSucess"
                    :before-upload="handleAvatarUpload"
                >
                    <img v-if="trademarkparams.logoUrl" :src="trademarkparams.logoUrl" class="avatar" />
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
import { ref, reactive } from 'vue'
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
import { reqAddOrUpdateTrademark } from '@/api/product/trademark'
let isShowDialog = ref<boolean>(false)
const addTrademark = () => {
    // 收集数据之前重置表单
    trademarkparams = reactive<TradeMark>({
        tmName: '',
        logoUrl: '',
    })
    isShowDialog.value = true
}
const updateTrademark = () => {
    isShowDialog.value = true
}
const cancel = () => {
    isShowDialog.value = false
}
const confirm = () => {
    reqAddOrUpdateTrademark(trademarkparams)
        .then(() => {
            ElMessage.success('添加品牌成功')
            getTrademarkList()
            isShowDialog.value = false
        })
        .catch((err) => {
            ElMessage.error(`添加品牌失败: ${err.message}`)
        })
}
import type { TradeMark } from '@/api/product/trademark/type.ts'
import { ElMessage } from 'element-plus'
let trademarkparams = reactive<TradeMark>({
    tmName: '',
    logoUrl: '',
})
// 上传文件之前的约束
const handleAvatarUpload = (rawFile: any) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
        ElMessage.error('上传图片只能是 JPG/PNG/GIF 格式!')
        return false
    } else if (rawFile.size > 1024 * 1024 * 4) {
        ElMessage.error('上传图片大小不能超过 4MB!')
        return false
    }
    return true
}
const handleAvatarSucess = (res: any, file: any) => {
    trademarkparams.logoUrl = res.data
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.dialog-footer button:first-child {
    margin-right: 10px;
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
