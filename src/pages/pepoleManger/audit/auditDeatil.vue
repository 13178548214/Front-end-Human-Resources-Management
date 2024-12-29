<script lang="ts" setup>
import { ref } from 'vue'
import {getAuditApi,auditApi,getSalaryStandard,getPrimaryStructure,getSecondaryStructure,getThirdStructure,getJobCategory,getJobName,createHumanResources} from '@/common/apis/pepole/index'
import { ElForm, FormInstance,UploadRawFile } from 'element-plus';
import { useUserStore } from '@/pinia/stores/user';

const route = useRoute();
const auditId = route.query.id as string; // 获取路由参数 id
const look = route.query.see
console.log(look,'look');


const form = ref({
  /** 一级机构 */
  primaryStructureId: '',
  /** 二级机构 */
  secondaryStructureId: '',
  /** 三级机构 */
  tertiaryStructureId: '',
 /** 职称分类 */
 jobClassification:'',
/** 职称名字 */
jobName :'',
/** 职称 */
 jobTitle :'',
/** 名字 */
 name :'',
/** 邮件 */
 email :'',
/** 性别 */
 gender :'',
/** 电话号码 */
 phoneNumber :'',
/** qq号码 */
 qqNumber :'',
/** 手机 */
 phoneNumber2 :'',
/** 地址 */
 address : '',
/** 邮编 */
 postcode :'',
/** 国籍 */
 country  :'',
/** 出生地 */
 nationality  :'',
/** 生日 */
 birthDate :'',
/** 名族 */
 family :'',
/** 宗教信仰 */
 religionFaith :'',
/** 政治面貌 */
 partyMembers :'',
/** 身份证号 */
 identificationNumber :'',
/** 社保卡号 */
 socialSecurityNumber:'',
/** 年龄 */
 age :'',
/** 学历 */
 deggree :'',
/** 教育年限 */
 educationYears :'',
/** 专业学历 */
 education :'',
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

/** 获取数据 */
const getData = async () => {
  const res = await getAuditApi({ id: auditId })
  const data = res.data
  imageUrl.value = data?.image
  time.value = data?.createdAt
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


const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
  }
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

const input = ref('')


const submitForm = async() => {
 // 使用 ElMessageBox 显示弹出框
ElMessageBox.confirm(
  '你确定要通过审核吗？',
  '提示',
  {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }
).then(async() => {
  await auditApi({ id: auditId })
  ElMessage.success('审核成功')
  const router = useRouter(); // 获取 router 实例
  router.back(); // 退回上一页
})
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

onMounted(() => {
  getData()
  getPrimaryStructureList()
  getSecondaryStructureList()
  getThirdStructureList()
  getJobCategoryList()
  getJobNameList()
  getRemunerationStandardList()
})

</script>

<template>
  <div class="page">
    <div style="display: flex;">
      <div class="left">
      <el-row :gutter="20">
    <el-col :span="8" style="display: flex;">
    <el-select  v-model="form.primaryStructureId" placeholder="一级机构" >
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
      <el-select  v-model="form.secondaryStructureId" placeholder="二级机构" >
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
      <el-select  v-model="form.tertiaryStructureId" placeholder="三级机构" >
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
    <el-select  v-model="form.jobClassification" placeholder="职位分类" >
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
      <el-select  v-model="form.jobName" placeholder="职位名称" >
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
      <el-select  v-model="form.jobTitle" placeholder="职称" >
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
      <el-select  v-model="form.gender" placeholder="性别" >
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
      <el-input v-model="form.email" placeholder="EMALL" ></el-input>
    </el-col>
      </el-row>
      <el-row :gutter="20">
    <el-col :span="8" style="display: flex;">
      <el-input v-model="form.phoneNumber" placeholder="电话" ></el-input>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-input v-model="form.qqNumber" placeholder="QQ" ></el-input>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-input v-model="form.phoneNumber2" placeholder="手机" ></el-input>
    </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" style="display: flex;">
          <el-input v-model="form.address" placeholder="住址" ></el-input>
        </el-col>
        <el-col :span="8" style="display: flex;">
          <el-input v-model="form.postcode" placeholder="邮编" ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="photo">
      <el-upload
  class="avatar-uploader"
  action="api/v1/humanResources/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :disabled="true"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar" mode="aspectFill">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </div>
    </div>
    <div class="middle">
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
    <el-select  v-model="form.country" placeholder="国籍" >
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
      <el-input v-model="form.nationality" placeholder="出生地" ></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.birthDate" placeholder="生日"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.family" placeholder="名族" ></el-input>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
    <el-select  v-model="form.religionFaith" placeholder="宗教信仰" >
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
      <el-select  v-model="form.partyMembers" placeholder="政治面貌" >
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
      <el-input v-model="form.identificationNumber" placeholder="身份证号码" ></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.socialSecurityNumber" placeholder="社会保障号码" ></el-input>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.age" placeholder="年龄" ></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-select  v-model="form.deggree" placeholder="学历" >
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
      <el-select  v-model="form.educationYears" placeholder="教育年限" >
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
      <el-select  v-model="form.education" placeholder="学历专业" >
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
        <el-input v-model="RemunerationStandard" placeholder="薪酬标准" >
        </el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.openingBank" placeholder="开户行" ></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="form.bankAccount" placeholder="账号" ></el-input>
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
      <el-select  v-model="form.good" placeholder="特长" >
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
      <el-input v-model="form.hobbys" placeholder="爱好" ></el-input>
    </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input  type="textarea" :rows="2" v-model="form.personalHistory" placeholder="个人履历" ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input type="textarea" :rows="2" v-model="form.familyHistory" placeholder="家庭关系信息" ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input type="textarea" :rows="2" v-model="form.remarks" placeholder="备注" ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="footer" v-if="!look">
      <el-button type="primary" @click="submitForm">审核通过</el-button>
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


