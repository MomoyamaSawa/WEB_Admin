<template>
    <el-card class="box-card">
        <!-- 添加品牌按钮 -->
        <el-button icon="Plus" type="primary" size="default" @click="addTrademark" v-has="`btn.Trademark.add`">
            添加品牌
        </el-button>
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
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                    <el-popconfirm :title="`您确定要删除${row.tmName}吗`" width="250px" icon="Delete"
                        @confirm="deleteTrademark(row.id)">
                        <template #reference>
                            <el-button size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" :small="true"
            :background="true" layout="prev,pager,next,jumper,->,sizes,total" :total="total" @size-change="sizeChange"
            @current-change="changePageNo" />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="isShowDialog" icon="" :title="trademarkparams.id ? '修改品牌' : '添加品牌'">
        <el-form ref="elfrom" :model="trademarkparams" :rules="rules" style="width: 80%">
            <el-form-item label-width="100px" label="品牌名称" prop="tmName">
                <el-input v-model="trademarkparams.tmName" placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="品牌LOGO" prop="logoUrl">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSucess" :before-upload="handleAvatarUpload">
                    <img v-if="trademarkparams.logoUrl" :src="trademarkparams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button size="default" @click="cancel">取消</el-button>
            <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts" name="Trademark">
import { ref, reactive, nextTick } from 'vue'
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
const getTrademarkList = (pageNum: number = 0) => {
    if (pageNum) {
        pageNo.value = pageNum
    }
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
 * 删除品牌
 */
import { reqDeleteTrademark } from '@/api/product/trademark'
const deleteTrademark = (id: number) => {
    reqDeleteTrademark(id)
        .then(() => {
            ElMessage.success('删除品牌成功')
            // 注意页码的跳转
            getTrademarkList(trademarkArr.value.length === 1 ? pageNo.value - 1 : pageNo.value)
        })
        .catch(() => {
            ElMessage.error('删除品牌失败')
        })
}

/**
 * 控制对话框
 */
import { reqAddOrUpdateTrademark } from '@/api/product/trademark'
let isShowDialog = ref<boolean>(false)
// 自定义校验功能
const validateTmName = (rule: any, value: string, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('品牌名称位数必须大于等于两位'))
    }
}
const validatelogoUrl = (rule: any, value: string, callback: any) => {
    if (value) {
        callback()
    } else {
        callback(new Error('品牌LOGO不能为空'))
    }
}
// 获取 el-from 表单
let elfrom = ref()
const rules = {
    tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
    // 文本框触发不了触发，我们在下面的 confirm 中触发
    logoUrl: [{ required: true, validator: validatelogoUrl }],
}
const addTrademark = () => {
    // 收集数据之前重置表单
    trademarkparams.id = 0
    trademarkparams.tmName = ''
    trademarkparams.logoUrl = ''
    // 清除校验结果
    nextTick(() => {
        elfrom.value.clearValidate()
    })
    isShowDialog.value = true
}
const updateTrademark = (row: TradeMark) => {
    // 注意这里收集了 id 哦
    trademarkparams.id = row.id
    trademarkparams.tmName = row.tmName
    trademarkparams.logoUrl = row.logoUrl
    isShowDialog.value = true
    // 清除校验结果
    nextTick(() => {
        elfrom.value.clearValidate()
    })
}
const cancel = () => {
    isShowDialog.value = false
}
const confirm = () => {
    // 整个表单校验
    elfrom.value.validate().then(() => {
        reqAddOrUpdateTrademark(trademarkparams)
            .then(() => {
                ElMessage.success(trademarkparams.id ? '修改品牌成功' : '添加品牌成功')
                getTrademarkList()
                isShowDialog.value = false
            })
            .catch((err) => {
                ElMessage.error(`操作失败: ${err.message}`)
            })
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
    // 清除校验结果
    elfrom.value.clearValidate('logoUrl')
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
