<template>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
        <div v-show="scene == 0">
            <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id ? false : true" @click="addAttr">
                添加属性
            </el-button>
            <el-table border style="margin: 10px 0px" :data="attrArr.list">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                <el-table-column label="属性值">
                    <template #default="{ row }">
                        <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateAttr"></el-button>
                        <el-button type="danger" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加属性和修改属性的结构 -->
        <div v-show="scene == 1">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input placeholder="请输入属性名" v-model="attrParams.attrName"></el-input>
                </el-form-item>
            </el-form>
            <el-button
                :disabled="attrParams.attrName ? false : true"
                type="primary"
                size="default"
                @click="addAttrValue"
                icon="Plus"
            >
                添加属性值
            </el-button>
            <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
                <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                <el-table-column label="属性值名称">
                    <!-- 编辑查看模式切换 -->
                    <template #default="{ row, $index }">
                        <el-input
                            v-if="row.flag"
                            @blur="toLook(row, $index)"
                            v-model="row.valueName"
                            placeholder="请输入属性值名称"
                            :ref="(vc: any) => (inputArr[$index] = vc)"
                        ></el-input>
                        <div v-else @click="toEdit(row, $index)">
                            {{ row.valueName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="属性值操作">
                    <template #default="{ row, $index }">
                        <el-button
                            type="danger"
                            size="small"
                            icon="Delete"
                            @click="attrParams.attrValueList.splice($index, 1)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button
                type="primary"
                size="default"
                @click="save"
                :disabled="attrParams.attrValueList.length > 0 ? false : true"
            >
                保存
            </el-button>
            <el-button size="default" @click="cancel">取消</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts" name="Attr">
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
import { watch, reactive, ref, nextTick } from 'vue'
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr'
import type { AttrResponseData, AttrList, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
let attrArr = reactive({ list: [] as AttrList })
watch(
    () => categoryStore.c3Id,
    (newVal, oldVal) => {
        // 清空数据
        attrArr.list = []
        // 保证三级分类有
        if (!newVal) return
        getAttr()
    },
)
const getAttr = () => {
    const { c3Id, c2Id, c1Id } = categoryStore
    reqAttr(c1Id, c2Id, c3Id).then((res: AttrResponseData) => {
        attrArr.list = res.data
    })
}

// 控制卡片内容切换
let scene = ref<number>(1)
const addAttr = () => {
    // 每一次点击时清空数据
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3,
    })
    // 收集参数
    attrParams.categoryId = categoryStore.c3Id
    scene.value = 1
}
const updateAttr = () => {
    scene.value = 1
}
const cancel = () => {
    scene.value = 0
}
let attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
})
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,
    })
    // 获取最后的input聚焦
    nextTick(() => {
        inputArr.value[inputArr.value.length - 1].focus()
    })
}
const save = () => {
    // 收集参数
    reqAddOrUpdateAttr(attrParams)
        .then((res: any) => {
            scene.value = 0
            ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
            getAttr()
        })
        .catch((err: any) => {
            ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
        })
}

// 编辑查看模式切换
const toLook = (row: AttrValue, index: number) => {
    // 判断用户有没有输入名字
    if (row.valueName.trim() == '') {
        ElMessage.error('请输入属性值名称')
        attrParams.attrValueList.splice(index, 1)
        return
    }
    // 属性值不能重复
    attrParams.attrValueList.forEach((item: AttrValue, i: number) => {
        if (i != index && item.valueName == row.valueName) {
            ElMessage.error('属性值不能重复')
            attrParams.attrValueList.splice(index, 1)
            return
        }
    })
    row.flag = false
}
const toEdit = (row: AttrValue, index: number) => {
    row.flag = true
    // 注意这边flag刚编程true，dom刚更新，所以要等待dom更新完成后再聚焦
    nextTick(() => {
        inputArr.value[index].focus()
    })
}

// 表单聚焦
let inputArr = ref<any[]>([])
</script>

<style scoped lang="scss"></style>
