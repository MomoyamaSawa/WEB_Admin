<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select placeholder="请选择SPU品牌" v-model="SpuParams.tmId">
                <el-option
                    v-for="(item, index) in allTradeMark"
                    :key="item.id"
                    :label="item.tmName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入SPU描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload
                v-model:file-list="imageList"
                action="/api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="handlerUpload"
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
            <el-select
                v-model="saleAttrIdAndvalueName"
                :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'"
            >
                <el-option
                    v-for="(item, index) in unSelectSaleAttr"
                    :key="item.id"
                    :label="item.name"
                    :value="`${item.id}:${item.name}`"
                ></el-option>
            </el-select>
            <el-button
                type="primary"
                size="default"
                icon="Plus"
                @click="addSaleAttr"
                style="margin-left: 10px"
                :disabled="saleAttrIdAndvalueName ? false : true"
            >
                添加属性值
            </el-button>
            <el-table border style="margin: 10px 0px" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名称" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <template #="{ row, $index }">
                        <el-tag
                            v-for="(item, index) in row.spuSaleAttrValueList"
                            :key="item.id"
                            style="margin: 5px 5px"
                            closable
                            @close="row.spuSaleAttrValueList.splice(index, 1)"
                        >
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input
                            @blur="toLook(row)"
                            v-model="row.saleAttrValue"
                            v-if="row.flag == true"
                            placeholder="请你输入属性值"
                            size="small"
                            style="width: 100px"
                        ></el-input>
                        <el-button v-else type="primary" size="small" icon="Plus" @click="toEdit(row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button
                            type="primary"
                            size="small"
                            icon="Delete"
                            @click="saleAttr.splice($index, 1)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save" :disabled="saleAttr.length > 0 ? false : true">
                保存
            </el-button>
            <el-button size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts" nmae="SpuForm">
import { ref, computed } from 'vue'
import type {
    SpuData,
    HasSaleAttrResponseData,
    SpuSaleAttrResponseData,
    SpuImageResponseData,
    ALLTradeMarkResponseData,
    TradeMark,
    SpuImage,
    SaleAttr,
    HasSaleAttr,
} from '@/api/product/spu/type'
import {
    reqSpuImageList,
    reqAllTrademark,
    reqSpuSaleAttrList,
    reqAllSaleAttr,
    reqAddORUpdateSpu,
} from '@/api/product/spu'
import { ElMessage } from 'element-plus'
const cancel = () => {
    $emit('changeScene', { flag: 0, params: 'update' })
}
let $emit = defineEmits(['changeScene'])
let allTradeMark = ref<TradeMark[]>([])
let imageList = ref<SpuImage[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
// 存储已有的SPU对象
let SpuParams = ref<SpuData>({
    category3Id: '', //收集三级分类的ID
    spuName: '', //SPU的名字
    description: '', //SPU的描述
    tmId: '', //品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
})
const initHasSpuData = (row: SpuData) => {
    SpuParams.value = row
    reqAllTrademark().then((res: ALLTradeMarkResponseData) => {
        allTradeMark.value = res.data
    })
    reqSpuSaleAttrList(row.id as number).then((res: SpuSaleAttrResponseData) => {
        saleAttr.value = res.data
    })
    reqSpuImageList(row.id as number).then((res: SpuImageResponseData) => {
        imageList.value = res.data.map((item) => {
            return {
                name: item.imgName,
                url: item.imgUrl,
            }
        })
    })
    reqAllSaleAttr().then((res: HasSaleAttrResponseData) => {
        allSaleAttr.value = res.data
    })
}

// 照片墙
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}
const handleRemove = (file: any) => {
    imageList.value = imageList.value.filter((item) => item.url !== file.url)
}
const handlerUpload = (file: any) => {
    // 约束图片大小和类型
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isGif = file.type === 'image/gif'
    const isLt2M = file.size / 1024 / 1024 < 3
    if (!isJPG && !isPNG && !isGif) {
        ElMessage.error('上传图片只能是 JPG/PNG 格式!')
        return false
    }
    if (!isLt2M) {
        ElMessage.error('上传图片大小不能超过 3MB!')
        return false
    }
    return true
}

// 计算当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
    return allSaleAttr.value.filter((item) => {
        return saleAttr.value.every((sale) => sale.saleAttrName !== item.name)
    })
})
let saleAttrIdAndvalueName = ref<string>('')
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndvalueName.value.split(':')
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
    }
    saleAttr.value.push(newSaleAttr)
    // 清空收集的数据，显然这是一个引用，直接把那个数组里的也删了
    saleAttrIdAndvalueName.value = ''
}
const toEdit = (row: SaleAttr) => {
    row.flag = true
    row.saleAttrValue = ''
}
import type { SaleAttrValue } from '@/api/product/spu/type'
const toLook = (row: SaleAttr) => {
    row.flag = false
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: row.saleAttrValue,
    }
    // 非法判断
    if (row.saleAttrValue.trim() == '') {
        ElMessage.error('属性值不能为空')
        return
    }
    if (row.spuSaleAttrValueList.find((item) => item.saleAttrValueName == row.saleAttrValue)) {
        ElMessage.error('属性值不能重复')
        return
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    row.saleAttrValue = ''
}

const save = () => {
    // 整理一下修改的参数
    // 照片墙数据
    SpuParams.value.spuImageList = imageList.value.map((item) => {
        return {
            imgUrl: item.url,
            imgName: item.name,
        }
    })
    // 销售属性的数据
    SpuParams.value.spuSaleAttrList = saleAttr.value
    console.log(SpuParams.value)
    reqAddORUpdateSpu(SpuParams.value)
        .then((res: any) => {
            ElMessage.success('保存成功')
            $emit('changeScene', { flag: 0, params: SpuParams.value.id ? 'update' : 'add' })
        })
        .catch((err: any) => {
            ElMessage.error('保存失败')
        })
}

// 添加SPU
const initAddSpu = (c3Id: number | string) => {
    // 清空数据
    Object.assign(SpuParams.value, {
        category3Id: '', //收集三级分类的ID
        spuName: '', //SPU的名字
        description: '', //SPU的描述
        tmId: '', //品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    })
    imageList.value = []
    saleAttr.value = []
    saleAttrIdAndvalueName.value = ''
    SpuParams.value.category3Id = c3Id
    reqAllTrademark().then((res: ALLTradeMarkResponseData) => {
        allTradeMark.value = res.data
    })
    reqAllSaleAttr().then((res: HasSaleAttrResponseData) => {
        allSaleAttr.value = res.data
    })
}

// 暴露给父组件
defineExpose({
    initHasSpuData,
    initAddSpu,
})
</script>

<style scoped></style>
