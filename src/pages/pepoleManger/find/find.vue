<script lang="ts" setup>
import {getPrimaryStructure,getSecondaryStructure,getThirdStructure,getJobCategory,getJobName} from '@/common/apis/pepole/index'
import { router } from '@/router';
const value = ref('')
const startDate = ref('')
const endDate = ref('')


/** 一级机构 */
const primaryStructureValue = ref('')
/** 二级机构 */
const secondaryStructureValue = ref('')
/** 三级机构 */
const thirdStructureValue = ref('')
/** 职位分类 */
const jobCategoryValue = ref('')
/** 职位名称 */
const jobNameValue = ref('')


/** 一级机构集合 */
const primaryStructure = ref()
/** 二级机构集合 */
const secondaryStructure = ref()
/** 三级机构集合 */
const thirdStructure = ref()
/** 职位分类集合 */
const jobCategory = ref()
/** 职位名称集合 */
const jobNameList = ref()

/** 获取一级机构集合 */
const getPrimaryStructureList = async () => {
  const res = await getPrimaryStructure()
  primaryStructure.value = res.data
}

/** 获取二级机构集合 */
const getSecondaryStructureList = async () => {
  const res = await getSecondaryStructure()
  secondaryStructure.value = res.data
}

/** 获取三级机构集合 */
const getThirdStructureList = async () => {
  const res = await getThirdStructure()
  thirdStructure.value = res.data
}

/** 获取职位分类集合 */
const getJobCategoryList = async () => {
  const res = await getJobCategory()
  jobCategory.value = res.data
}

/** 获取职位名称集合 */
const getJobNameList = async () => {
  const res = await getJobName()
  jobNameList.value = res.data
}

/** 查找 */
const search = async () => {
  console.log(startDate.value,endDate.value,primaryStructureValue.value,secondaryStructureValue.value,jobCategoryValue.value,jobNameValue.value);
  router.push({
    name: 'audit',
    query: {
      find: 1,
      startDate: startDate.value,
      endDate: endDate.value,
      jobName: jobNameValue.value,
      primaryStructure: primaryStructureValue.value,
      secondaryStructure: secondaryStructureValue.value,
      tertiaryStructure: thirdStructureValue.value,
      jobCategoryValue: jobCategoryValue.value
    }
  })
}

onMounted(() => {
  getPrimaryStructureList()
  getSecondaryStructureList()
  getThirdStructureList()
  getJobCategoryList()
  getJobNameList()
})
</script>


<template>
  <div class="container">
    <el-button type="primary" @click="search" style="position: relative; right: -500px;">查询</el-button>
   <div class="first">
    <div class="label">一级机构：</div>
    <el-select v-model="primaryStructureValue" placeholder="请选择" style="width: 300px;">
      <el-option
        v-for="item in primaryStructure"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
   </div>
   <div class="second">
    <div class="label">二级机构：</div>
    <el-select v-model="secondaryStructureValue" placeholder="请选择" style="width: 300px;">
      <el-option
        v-for="item in secondaryStructure"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
   </div>
   <div class="third">
    <div class="label">三级机构：</div>
    <el-select v-model="thirdStructureValue" placeholder="请选择" style="width: 300px;">
      <el-option
        v-for="item in thirdStructure"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
   </div>
   <div class="jobCategory">
    <div class="label">职位分类：</div>
    <el-select v-model="jobCategoryValue" placeholder="请选择" style="width: 300px;">
      <el-option
        v-for="item in jobCategory"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
   </div>
   <div class="jobName">
    <div class="label">职位名称：</div>
    <el-select v-model="jobNameValue" placeholder="请选择" style="width: 300px;">
      <el-option
        v-for="item in jobNameList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
   </div>
   <div class="time">
    <div class="label">建档时间：</div>
    <div class="block" style="margin-right: 10px;">
    <el-date-picker
      v-model="startDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
    至
  <div class="block" style="margin-left: 10px;">
    <el-date-picker
      v-model="endDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
   </div>
  </div>
</template>

<style lang="scss" scoped>
   .container{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px;
    .findSelect{
      display: flex;

    }
    .first{
      margin: 10px;
      display: flex;
      align-items: center;
      .label{
        width: 80px;
      }
    }
    .second{
      margin: 10px;
      display: flex;
      align-items: center;
      .label{
        width: 80px;
      }
    }
    .third{
      margin: 10px;
      display: flex;
      align-items: center;
      .label{
        width: 80px;
      }
    }
    .jobCategory{
      margin: 10px;
      display: flex;
      align-items: center;
      .label{
        width: 80px;
      }
    }
    .jobName{
      margin: 10px;
      display: flex;
      align-items: center;
      .label{
        width: 80px;
      }
    }
    .time{
      margin: 10px;
      display: flex;
      align-items: center;
      .label{
        width: 80px;
      }
    }
   }
</style>
