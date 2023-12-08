<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" @change="handleChangeC1">
                    <el-option
                        v-for="c1 in categoryStore.c1Arr"
                        :key="c1.id"
                        :label="c1.name"
                        :value="c1.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" @change="handleChangeC2">
                    <el-option
                        v-for="c2 in categoryStore.c2Arr"
                        :key="c2.id"
                        :label="c2.name"
                        :value="c2.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id">
                    <el-option
                        v-for="c3 in categoryStore.c3Arr"
                        :key="c3.id"
                        :label="c3.name"
                        :value="c3.id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts" name="Category">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
onMounted(async () => {
    getC1()
})
const getC1 = () => {
    categoryStore.getC1()
}
const handleChangeC1 = () => {
    // 清除相关二级三级数据
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.c3Arr = []
    categoryStore.getC2(categoryStore.c1Id)
}
const handleChangeC2 = () => {
    // 清除相关三级数据
    categoryStore.c3Id = ''
    categoryStore.getC3(categoryStore.c2Id)
}
</script>

<style scoped></style>
