<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select placeholder="请选择SPU品牌">
                <el-option label="华为"></el-option>
                <el-option label="OPPO"></el-option>
                <el-option label="Vivo"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload
                v-model:file-list="fileList"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select placeholder="请选择SPU销售属性">
                <el-option label="华为"></el-option>
                <el-option label="OPPO"></el-option>
                <el-option label="Vivo"></el-option>
            </el-select>
            <el-button type="primary" size="default" icon="Plus" @click="" style="margin-left: 10px">
                添加属性值
            </el-button>
            <el-table border style="margin: 10px 0px">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名称" width="120px"></el-table-column>
                <el-table-column label="销售属性值"></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="">保存</el-button>
            <el-button size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts" nmae="SpuForm">
const cancel = () => {
    $emit('changeScene', 0)
}
let $emit = defineEmits(['changeScene'])
</script>

<style scoped></style>
