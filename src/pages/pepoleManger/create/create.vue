<script lang="ts" setup>
import { ref } from 'vue'
import {updateApi,getAuditApi,getIsCreateApi,getSalaryStandard,getPrimaryStructure,getSecondaryStructure,getThirdStructure,getJobCategory,getJobName,createHumanResources} from '@/common/apis/pepole/index'
import { ElForm, FormInstance,UploadRawFile } from 'element-plus';
import { useUserStore } from '@/pinia/stores/user';
import { router } from '@/router';

const form = ref({
  /** 一级机构 */
  primaryStructureId: '01',
  /** 二级机构 */
  secondaryStructureId: '02',
  /** 三级机构 */
  tertiaryStructureId: '01',
 /** 职称分类 */
 jobClassification:'01',
/** 职称名字 */
jobName :'01',
/** 职称 */
 jobTitle :'01',
/** 名字 */
 name :'欧哟',
/** 邮件 */
 email :'',
/** 性别 */
 gender :'',
/** 电话号码 */
 phoneNumber :'13178548214',
/** qq号码 */
 qqNumber :'',
/** 手机 */
 phoneNumber2 :'',
/** 地址 */
 address : '',
/** 邮编 */
 postcode :'',
/** 国籍 */
 country  :'中国',
/** 出生地 */
 nationality  :'',
/** 生日 */
 birthDate :'',
/** 名族 */
 family :'汉族',
/** 宗教信仰 */
 religionFaith :'',
/** 政治面貌 */
 partyMembers :'',
/** 身份证号 */
 identificationNumber :'',
/** 社保卡号 */
 socialSecurityNumber:'',
/** 年龄 */
 age :'18',
/** 学历 */
 deggree :'本科',
/** 教育年限 */
 educationYears :'9',
/** 专业学历 */
 education :'计算机',
 /** 开户行 */
 openingBank :'',
/** 账号 */
 bankAccount :'',
/** 特长 */
 good :'',
/** 爱好 */
 hobbys :'',
/** 照片  */
 image :'',
/** 个人履历 */
 personalHistory :'',
/** 家庭关系信息 */
 familyHistory :'',
/** 备注 */
 remarks :'',
})

/** 薪酬标准 */
const RemunerationStandard =computed(() => {
  const foundItem = salaryStandard.value?.find((item: any) => item.value === form.value.jobName);
    if (foundItem) {
      return`${foundItem.label}/${foundItem.money}`
    }
})

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
/** 薪酬标准集合 */
const salaryStandard = ref<Array<any>>()

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

/** 获取薪酬标准 */
const getRemunerationStandardList = async () => {
  const res = await getSalaryStandard()
  salaryStandard.value = res.data as any
}

/** 状态 */
const status = ref()

/** 获取判断状态 */
const getStaus = async () => {
  const res = await getIsCreateApi({userId: useUserStore().userId})
  status.value = res.data
}

/** 获取数据 */
const getData = async () => {
  const res = await getAuditApi({ id: status.value?.id })
  const data = res.data
  imageUrl.value = data?.image
  // 获取 form.value 的所有键
  const formKeys = Object.keys(form.value);
 // 创建一个新的对象，只包含 form.value 中存在的键
 const filteredData = formKeys.reduce((acc, key) => {
      if (data.hasOwnProperty(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {} as any);

    // 使用 Object.assign 将过滤后的数据赋值给 form.value
    Object.assign(form.value, filteredData);
}

/** 更新回显数据 */
const updateData = async () => {
 if(status.value?.create){
  getData()
 }
}

/** 职称列表 */
const jobList = [
  {
    value: '工程师',
    label: '工程师'
  }
]

/** 性别 */
const genderList = [
  {
    value: '男',
    label: '男'
  },
  {
    value: '女',
    label: '女'
  }
]

/** 国籍列表  */
const countryList = [
  {
    value: '中国',
    label: '中国'
  },
  {
    value: '美国',
    label: '美国'
  },
  {
    value: '俄罗斯',
    label: '俄罗斯'
  },
  {
    value: '日本',
    label: '日本'
  },
  {
    value: '韩国',
    label: '韩国'
  },
]

/** 政治面貌列表 */
const partyMembersList = [
  {
    value: '党员',
    label: '党员'
  },
  {
    value: '共青团员',
    label: '共青团员'
  },
  {
    value: '群众',
    label: '群众'
  },
]

/** 学历列表 */
const deggreeList = [
  {
    value: '本科',
    label: '本科'
  },
  {
    value: '硕士',
    label: '硕士'
  },
  {
    value: '博士',
    label: '博士'
  },
  {
    value: '其他',
    label: '其他'
  },
]

/** 教育年限 */
const educationYearsList = [
  {
    value: '1-3年',
    label: '1-3年'
  },
  {
    value: '3-5年',
    label: '3-5年'
  },
  {
    value: '5-10年',
    label: '5-10年'
  },
  {
    value: '10年以上',
    label: '10年以上'
  }
]

/** 学历专业 */
const educationList = [
  {
    value: '计算机',
    label: '计算机'
  },
  {
    value: '数学',
    label: '数学'
  },
  {
    value: '英语',
    label: '英语'
  },
  {
    value: '其他',
    label: '其他'
  },
]

/** 宗教信仰列表 */
const religionFaithList = [
  {
    value: '无',
    label: '无'
  },
  {
    value: '佛教',
    label: '佛教'
  },
  {
    value: '道教',
    label: '道教'
  },
  {
    value: '基督教',
    label: '基督教'
  },
  {
    value: '伊斯兰教',
    label: '伊斯兰教'
  }
]

/** 特长列表 */
const goodList = [
  {
    value: '打游戏',
    label: '打游戏'
  },
  {
    value: '数据库',
    label: '数据库'
  },
  {
    value: 'web前端',
    label: 'web前端'
  },
  {
    value: '数据分析',
    label: '数据分析'
  },
]



const imageUrl = ref('')

const handleAvatarSuccess = (res: any, file: any) => {
  imageUrl.value = res.data.fileUrl
}

const beforeAvatarUpload = (file: UploadRawFile) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG) {
     ElMessage.error('上传头像图片只能是 JPG 格式!');
     return false;
  }
  if (!isLt2M) {
     ElMessage.error('上传头像图片大小不能超过 2MB!');
     return false;
  }
  return true;
}


const submitForm = async() => {
  if(!status.value?.create){
    if(!form.value.primaryStructureId){
    ElMessage.error('请选择一级机构')
    return
  }
  if(!form.value.secondaryStructureId){
    ElMessage.error('请选择二级机构')
    return
  }
  if(!form.value.tertiaryStructureId){
    ElMessage.error('请选择三级机构')
    return
  }
  if(!form.value.jobClassification){
    ElMessage.error('请选择职位分类')
    return
  }
  if(!form.value.jobName){
    ElMessage.error('请选择职位名称')
    return
  }
  if(!form.value.name){
    ElMessage.error('请输入姓名')
    return
  }
  if(!form.value.phoneNumber){
    ElMessage.error('请输入手机号')
    return
  }
  if(!form.value.country){
    ElMessage.error('请选择国家')
    return
  }
  if(!form.value.family){
    ElMessage.error('请选择民族')
    return
  }
  if(!form.value.deggree){
    ElMessage.error('请选择学历')
    return
  }
  if(!form.value.educationYears){
    ElMessage.error('请选择教育年限')
    return
  }
  if(!form.value.education){
    ElMessage.error('请选择学历专业')
    return
  }
  if(!imageUrl.value){
    ElMessage.error('请上传照片')
    return
  }
await createHumanResources({...form.value,user:useUserStore().userId,image:imageUrl.value})
ElMessage.success('创建成功')
await getStaus()
  getPrimaryStructureList()
  getSecondaryStructureList()
  getThirdStructureList()
  getJobCategoryList()
  getJobNameList()
  getRemunerationStandardList()
  updateData()
  }else{
    await updateApi({...form.value,id:status.value?.id,image:imageUrl.value,deleted:false})
    ElMessage.success('请等待审核')
    await getStaus()
  getPrimaryStructureList()
  getSecondaryStructureList()
  getThirdStructureList()
  getJobCategoryList()
  getJobNameList()
  getRemunerationStandardList()
  updateData()
  }
}

// 获取当前日期并格式化为 yyyy-mm-dd
const getCurrentDateFormatted = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并补零
  const day = String(now.getDate()).padStart(2, '0'); // 补零
  return `${year}-${month}-${day}`;
}

const time = ref(getCurrentDateFormatted())

const canUpdate = computed(() => {
  if(status.value?.create && !status.value?.deleted){
    return true
  }else{
    return false
  }
})

onMounted(async() => {
 await getStaus()
  getPrimaryStructureList()
  getSecondaryStructureList()
  getThirdStructureList()
  getJobCategoryList()
  getJobNameList()
  getRemunerationStandardList()
  updateData()
})

</script>

<template>
  <div class="page">
    <div :class="status?.pass ? 'title_1' : 'title_2'" v-if="status?.create && !status?.deleted">
      {{status?.pass ? '已通过审核' : '待审核中'}}
    </div>
    <div class="title_2" v-if="status?.deleted">
      已被删除
    </div>
    <div style="display: flex;">
      <div class="left">
      <el-row :gutter="20">
    <el-col :span="8" style="display: flex;">
    <el-select  v-model="form.primaryStructureId" placeholder="一级机构" :disabled="canUpdate">
    <el-option
      v-for="item in primaryStructure"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-select  v-model="form.secondaryStructureId" placeholder="二级机构" :disabled="canUpdate">
    <el-option
      v-for="item in secondaryStructure"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-select  v-model="form.tertiaryStructureId" placeholder="三级机构" :disabled="canUpdate">
    <el-option
      v-for="item in thirdStructure"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="8" style="display: flex;">
    <el-select  v-model="form.jobClassification" placeholder="职位分类" :disabled="canUpdate">
    <el-option
      v-for="item in jobCategory"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-select  v-model="form.jobName" placeholder="职位名称" :disabled="canUpdate">
    <el-option
      v-for="item in jobNameList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-select  v-model="form.jobTitle" placeholder="职称" :disabled="canUpdate">
    <el-option
      v-for="item in jobList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
      </el-row>
      <el-row :gutter="20">
    <el-col :span="8" style="display: flex;">
      <el-input v-model="form.name" placeholder="姓名"></el-input>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-select  v-model="form.gender" placeholder="性别">
    <el-option
      v-for="item in genderList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-input v-model="form.email" placeholder="EMALL"></el-input>
    </el-col>
      </el-row>
      <el-row :gutter="20">
    <el-col :span="8" style="display: flex;">
      <el-input v-model="form.phoneNumber" placeholder="电话"></el-input>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-input v-model="form.qqNumber" placeholder="QQ"></el-input>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-input v-model="form.phoneNumber2" placeholder="手机"></el-input>
    </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" style="display: flex;">
          <el-input v-model="form.address" placeholder="住址"></el-input>
        </el-col>
        <el-col :span="8" style="display: flex;">
          <el-input v-model="form.postcode" placeholder="邮编"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="photo">
      <el-upload
  class="avatar-uploader"
  action="api/v1/humanResources/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar" mode="aspectFill">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </div>
    </div>
    <div class="middle">
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
    <el-select  v-model="form.country" placeholder="国籍">
    <el-option
      v-for="item in countryList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.nationality" placeholder="出生地"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.birthDate" placeholder="生日"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.family" placeholder="名族"></el-input>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
    <el-select  v-model="form.religionFaith" placeholder="宗教信仰">
    <el-option
      v-for="item in religionFaithList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-select  v-model="form.partyMembers" placeholder="政治面貌">
    <el-option
      v-for="item in partyMembersList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.identificationNumber" placeholder="身份证号码"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.socialSecurityNumber" placeholder="社会保障号码"></el-input>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.age" placeholder="年龄"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-select  v-model="form.deggree" placeholder="学历">
    <el-option
      v-for="item in deggreeList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-select  v-model="form.educationYears" placeholder="教育年限">
    <el-option
      v-for="item in educationYearsList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-select  v-model="form.education" placeholder="学历专业">
    <el-option
      v-for="item in educationList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
        <el-input v-model="RemunerationStandard" placeholder="薪酬标准" :disabled="true">
        </el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.openingBank" placeholder="开户行"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.bankAccount" placeholder="账号"></el-input>
    </el-col>
    <!-- <el-col :span="6" style="display: flex;">
      <el-input v-model="input" placeholder="登记人"></el-input>
    </el-col> -->
      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
      <el-input v-model="time" placeholder="建档时间" :disabled="true"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-select  v-model="form.good" placeholder="特长">
    <el-option
      v-for="item in goodList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.hobbys" placeholder="爱好"></el-input>
    </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input  type="textarea" :rows="2" v-model="form.personalHistory" placeholder="个人履历"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input type="textarea" :rows="2" v-model="form.familyHistory" placeholder="家庭关系信息"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input type="textarea" :rows="2" v-model="form.remarks" placeholder="备注"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="footer" v-if="!status?.deleted">
      <el-button type="primary" @click="submitForm">{{status?.create ? '更新':'创建'}}</el-button>
    </div>
    <div class="footer" v-if="status?.deleted">
      <el-button type="primary" @click="submitForm">重新创建</el-button>
    </div>
  </div>
</template>

<style>
.page{
  height: 100%;
  width: 100%;
  padding: 20px;
}
.left{
  width: 80%;
  margin-right: 20px;
}
.middle{
  margin-top: 20px;
}
.footer{
  margin: 20px;
  margin-right: 80px;
  padding-bottom: 20px;
  text-align: right;
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    background: #e5e9f2;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<style>
.title_1{
  margin-bottom: 10px;
  font-size: 15px;
  text-align: right;
  color: #42bb09;
}
.title_2{
  margin-bottom: 10px;
  font-size: 15px;
  text-align: right;
  color: #e90000;
}
.avatar {
    width: 178px;
    height: 230px !important;
    display: block;
    z-index: 9;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


