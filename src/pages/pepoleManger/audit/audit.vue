<script lang="ts" setup>
import {getWaitAuditApi} from "@/common/apis/pepole/index";
import { router } from "@/router";
import {ref} from "vue";

/** 数据列表 */
const tableData = ref<any[]>()

/** 数据总条数 */
const total = ref(0)

/** 获取数据 */
const getTableData = async () => {
  const res = await getWaitAuditApi()
  tableData.value = res.data.List
  total.value = res.data.number
}

const audit = (index: number)=>{
  console.log(tableData.value?.[index].id);
  router.push({
    name: 'auditDeatil',
    query: {
      id: tableData.value?.[index].id
    }
  })
}

onMounted(() => {
  getTableData()
})
</script>


<template>
  <div class="page">
   <div class="title">当前等待审核的人力资源档案总数：{{ total }}条</div>
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
              审核
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
    margin: 10px;
    margin-top: 0px;
  }
 }
</style>
