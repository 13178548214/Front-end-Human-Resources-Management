<script lang="ts" setup>
import { ref } from 'vue'
import {getAllApi,deleteOrRecoveryApi} from '@/common/apis/pepole/index'
/** 重置 */
const reset = ()=>{
  userId.value = ''
 getData()
 ElMessage.success('重置成功')
}

/** 数据集合 */
const tableData = ref()

/** 获取数据 */
const getData = async (id?:string,deleted?:boolean) => {
  const res = await getAllApi({id:id,deleted:deleted})
  console.log(res.data);
  tableData.value = res.data.List
}

/** 查询特定状态 */
const handleSearch = async (deleted:boolean) => {
  const res = await getAllApi({deleted:deleted})
  console.log(res.data);
  tableData.value = res.data.List
  ElMessage.success("操作成功")
}

/** 删除数据 */
const handle = (index:number) => {
  if(tableData.value[index].deleted){
    ElMessageBox.confirm('此操作将恢复该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async() => {
    await deleteOrRecoveryApi({id:tableData.value[index].id,deleted:false})
    ElMessage({
      type: 'success',
      message: '恢复成功!'
    })
    getData()
  })
  }else{
    ElMessageBox.confirm('此操作删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async() => {
    await deleteOrRecoveryApi({id:tableData.value[index].id,deleted:true})
    ElMessage({
      type: 'success',
      message: '删除成功!'
    })
    getData()
  })
  }
}

/** 用户id */
const userId = ref('')

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="page" >
    <div class="top" style="display: flex; justify-content: space-around; align-items: center; height: 50px;">
      <div class="find">
      <el-input v-model="userId" placeholder="请输入档案编号" style="width: 200px; margin-right: 10px;"></el-input>
      <el-button type="primary" @click="getData(userId,undefined)">查询</el-button>
    </div>
    <el-button type="primary" @click="handleSearch(true)" >查询已删除档案</el-button>
    <el-button type="primary" @click="handleSearch(false)" >查询未删除档案</el-button>
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
      fixed
      prop="deleted"
      label="是否已删除"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="80">
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
              @click.prevent="handle($index)"
              :type="`${tableData[$index].deleted ? 'success' : 'danger'}`"
              size="small"
            >
            {{ tableData[$index].deleted ? '恢复' : '删除' }}
            </el-button>
          </template>
    </el-table-column>
  </el-table>
   </div>
  </div>
</template>

<style lang="scss" scoped>
.page{
  padding: 20px;
  width: 100%;
  height: 100%;
}
</style>
