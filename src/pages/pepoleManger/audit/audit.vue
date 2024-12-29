<script lang="ts" setup>
import {getWaitAuditApi} from "@/common/apis/pepole/index";
import {getApi} from "@/common/apis/pepole/index";
import { router } from "@/router";
import {ref} from "vue";
const route = useRoute()

const primaryStructureValue = ref(route.query.primaryStructure )
const secondaryStructureValue = ref(route.query.secondaryStructure)
const thirdStructureValue = ref(route.query.tertiaryStructure)
const jobCategoryValue = ref(route.query.jobCategoryValue )
const jobNameValue = ref(route.query.jobName)
const startDate = ref(route.query.startDate )
const endDate = ref(route.query.endDate)
const find = ref(route.query.find)

/** 数据列表 */
const tableData = ref<any[]>()

/** 数据总条数 */
const total = ref(0)


/** 获取数据 */
const getTableData = async () => {
  if(find.value){
  const res = await getApi({primaryStructureLabel:primaryStructureValue.value,secondaryStructureLabel:secondaryStructureValue.value,tertiaryStructureLabel:thirdStructureValue.value,jobClassificationLabel:jobCategoryValue.value,jobNameLabel:jobNameValue.value,startDate:startDate.value,endDate:endDate.value})
  console.log(res.data);
  tableData.value = res.data.List
  total.value = res.data.number
}else{
    const res = await getWaitAuditApi()
  tableData.value = res.data.List
  total.value = res.data.number
  }
}

const audit = (index: number)=>{
  if(find.value){
    router.push({
      name: 'auditDeatil',
      query: {
        id: tableData.value?.[index].id,
        see: 1,
      }
    })
  }else{
    router.push({
    name: 'auditDeatil',
    query: {
      id: tableData.value?.[index].id
    }
  })
  }
}


const reset = ()=>{
  find.value = ''
  primaryStructureValue.value = '',
  secondaryStructureValue.value = '',
  thirdStructureValue.value = '',
  jobCategoryValue.value = '',
  jobNameValue.value = '',
  startDate.value = '',
  endDate.value = '',
  getTableData()
}

onMounted(() => {
  getTableData()
})
</script>


<template>
  <div class="page" >
    <div class="top" style="display: flex; justify-content: space-between; align-items: center; height: 50px;">
      <div class="title">{{find ? '符合条件的人力资源档案总数：' : '当前等待审核的人力资源档案总数：'}}{{ total }}条</div>
      <el-button type="primary" @click="reset" >重置</el-button>
    </div>
   <div class="List">
    <el-table
    :data="tableData"
    style="width: 100%"
    max-height="100%">
    <el-table-column
      fixed
      prop="id"
      label="档案编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="primaryStructureName"
      label="一级机构"
      width="120">
    </el-table-column>
    <el-table-column
      prop="secondaryStructureName"
      label="二级机构"
      width="300">
    </el-table-column>
    <el-table-column
      prop="tertiaryStructureName"
      label="三级机构"
      width="120">
    </el-table-column>
    <el-table-column
      prop="jobName"
      label="职位名称"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template #default="{ $index }">
            <el-button
              @click.prevent="audit($index)"
              type="text"
              size="small"
            >
              {{find ? '查看' : '审核'}}
            </el-button>
          </template>
    </el-table-column>
  </el-table>
   </div>
  </div>
</template>

<style lang="scss" scoped>
 .page{
  padding: 15px;
  .title{
    font-size: 15px;
  }
 }
</style>
