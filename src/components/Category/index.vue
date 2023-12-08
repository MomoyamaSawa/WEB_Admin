<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id">
                    <el-option
                        v-for="c1 in categoryStore.c1Arr"
                        :key="c1.id"
                        :label="c1.name"
                        :value="c1.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select>
                    <el-option label="北京"></el-option>
                    <el-option label="广州"></el-option>
                    <el-option label="深圳"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select>
                    <el-option label="北京"></el-option>
                    <el-option label="广州"></el-option>
                    <el-option label="深圳"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts" name="Category">
import { onMounted } from 'vue'
import { userCategoryStore } from '@/store/modules/category'
let categoryStore = userCategoryStore()
onMounted(async () => {
    getC1()
})
const getC1 = () => {
    userCategoryStore.getC1()
}
</script>

<style scoped></style>
