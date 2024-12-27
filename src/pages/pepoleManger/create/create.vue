<script lang="ts" setup>
import { ref } from 'vue'
import {getPrimaryStructure,getSecondaryStructure,getThirdStructure,getJobCategory,getJobName,createHumanResources} from '@/common/apis/pepole/index'
import { ElForm, FormInstance,UploadRawFile } from 'element-plus';
import { tr } from 'element-plus/es/locales.mjs';
/** 一级机构 */
const primaryStructureId = ref('')
/** 二级机构 */
const secondaryStructureId = ref('')
/** 三级机构 */
const tertiaryStructureId = ref('')
/** 职称分类 */
const jobClassification = ref('')
/** 职称名字 */
const jobName = ref('')
/** 职称 */
const jobTitle = ref('')
/** 名字 */
const name = ref('')
/** 邮件 */
const email = ref('')
/** 性别 */
const gender = ref('')
/** 电话号码 */
const phoneNumber = ref('')
/** qq号码 */
const qqNumber = ref('')
/** 手机 */
const phoneNumber2 = ref('')
/** 地址 */
const address = ref('')
/** 邮编 */
const postcode = ref('')
/** 国籍 */
const country = ref('')
/** 出生地 */
const nationality = ref('')
/** 生日 */
const birthDate = ref('')
/** 名族 */
const family = ref('')
/** 宗教信仰 */
const religionFaith = ref('')
/** 政治面貌 */
const partyMembers = ref('')
/** 身份证号 */
const identificationNumber = ref('')
/** 社保卡号 */
const socialSecurityNumber = ref('')
/** 年龄 */
const age = ref('')
/** 学历 */
const deggree = ref('')
/** 教育年限 */
const educationYears = ref('')
/** 专业学历 */
const education = ref('')
/** 薪酬标准 */
const RemunerationStandard = ref('')
/** 开户行 */
const openingBank = ref('')
/** 账号 */
const bankAccount = ref('')
/** 特长 */
const good = ref('')
/** 爱好 */
const hobbys = ref('')
/** 照片  */
const image = ref('')
/** 个人履历 */
const personalHistory = ref('')
/** 家庭关系信息 */
const familyHistory = ref('')
/** 备注 */
const remarks = ref('')

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

const textarea = ref('')

const submitForm = () => {
  console.log(primaryStructureId.value);

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
  getPrimaryStructureList()
  getSecondaryStructureList()
  getThirdStructureList()
  getJobCategoryList()
  getJobNameList()
})

</script>

<template>
  <div class="page">
    <div style="display: flex;">
      <div class="left">
      <el-row :gutter="20">
    <el-col :span="8" style="display: flex;">
    <el-select  v-model="primaryStructureId" placeholder="一级机构">
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
      <el-select  v-model="secondaryStructureId" placeholder="二级机构">
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
      <el-select  v-model="tertiaryStructureId" placeholder="三级机构">
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
    <el-select  v-model="jobClassification" placeholder="职位分类">
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
      <el-select  v-model="jobName" placeholder="职位名称">
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
      <el-select  v-model="jobTitle" placeholder="职称">
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
      <el-input v-model="name" placeholder="姓名"></el-input>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-select  v-model="gender" placeholder="性别">
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
      <el-input v-model="email" placeholder="EMALL"></el-input>
    </el-col>
      </el-row>
      <el-row :gutter="20">
    <el-col :span="8" style="display: flex;">
      <el-input v-model="phoneNumber" placeholder="电话"></el-input>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-input v-model="qqNumber" placeholder="QQ"></el-input>
    </el-col>
    <el-col :span="8" style="display: flex;">
      <el-input v-model="phoneNumber2" placeholder="手机"></el-input>
    </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" style="display: flex;">
          <el-input v-model="address" placeholder="住址"></el-input>
        </el-col>
        <el-col :span="8" style="display: flex;">
          <el-input v-model="postcode" placeholder="邮编"></el-input>
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
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </div>
    </div>
    <div class="middle">
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
    <el-select  v-model="country" placeholder="国籍">
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
      <el-input v-model="nationality" placeholder="出生地"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="birthDate" placeholder="生日"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="family" placeholder="名族"></el-input>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
    <el-select  v-model="religionFaith" placeholder="宗教信仰">
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
      <el-select  v-model="partyMembers" placeholder="政治面貌">
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
      <el-input v-model="identificationNumber" placeholder="身份证号码"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="socialSecurityNumber" placeholder="社会保障号码"></el-input>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
      <el-input v-model="age" placeholder="年龄"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-select  v-model="deggree" placeholder="学历">
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
      <el-select  v-model="educationYears" placeholder="教育年限">
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
      <el-select  v-model="educationList" placeholder="学历专业">
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
      <el-select  v-model="RemunerationStandard" placeholder="薪酬标准">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
    </el-select>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="openingBank" placeholder="开户行"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="bankAccount" placeholder="账号"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-input v-model="input" placeholder="登记人"></el-input>
    </el-col>

      </el-row>
      <el-row :gutter="20">
    <el-col :span="6" style="display: flex;">
      <el-input v-model="time" placeholder="建档时间" :disabled="true"></el-input>
    </el-col>
    <el-col :span="6" style="display: flex;">
      <el-select  v-model="good" placeholder="特长">
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
      <el-input v-model="hobbys" placeholder="爱好"></el-input>
    </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input  type="textarea" :rows="2" v-model="personalHistory" placeholder="个人履历"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input type="textarea" :rows="2" v-model="familyHistory" placeholder="家庭关系信息"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" style="display: flex;">
          <el-input type="textarea" :rows="2" v-model="remarks" placeholder="备注"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-button type="primary" @click="submitForm">创建</el-button>
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


