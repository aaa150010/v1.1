<template>
<div class="coredataContainer">
  <a-button type="primary" @click="handleOpen2">数据填报</a-button>
  <a-card :bordered="false" style="margin-top: 10px">
    <div style="display: flex;width: 100%">
     <div style="width: 80%;padding-right: 10px;display: flex;align-items: center">
       <a-form :model="formState" style="width: 100%" ref="formRef">
         <div style="display: flex">
            <div style="width: 33%">
              <a-form-item label="年份" name="year">
                <a-select
                    ref="select"
                    placeholder="请选择年份"
                    v-model:value="formState.year"
                    @focus="focus"
                >
                  <a-select-option :value="item" v-for="item in yearList" :key="item">{{item}}</a-select-option>
                </a-select>
              </a-form-item>
            </div>
         <div style="width: 33%">
           <a-form-item label="省份"  name="province">
             <a-select
                 ref="select"
                 placeholder="请选择省份"
                 v-model:value="formState.province"
                 @change="handleChangeProvince"
                 @focus="focus">
               <a-select-option :value="item" v-for="item in provinceList" :key="item">{{item}}</a-select-option>
             </a-select>
           </a-form-item>
         </div>
           <div style="width: 34%">
             <a-form-item label="学校"  name="schoolCode">
               <a-select
                   ref="select"
                   placeholder="请选择学校"
                   v-model:value="formState.schoolCode"
                   @focus="focus">
                 <a-select-option :value="item.value" v-for="item in schoolList1" :key="item">{{item.label}}</a-select-option>
               </a-select>
             </a-form-item>
           </div>
     </div>
         <div>
           <a-form-item label="数据项" name="itemList">
             <a-tree-select
                 v-model:value="formState.itemList"
                 style="width: 100%"
                 :tree-data="treeData"
                 tree-checkable
                 :field-names="{
      children: 'children',
      label: 'label',
      value: 'key',
    }"
                 placeholder="请选择需要筛选的数据项"
             />
           </a-form-item>
         </div>
       </a-form>
     </div>
      <div style="width: 20%;display: flex">
        <div style="width: 50%">
          <a-button type="primary" style="width: 100%;height: 80%" @click="handleConfirm">确认</a-button>
        </div>
        <div style="width: 50%">
          <a-button style="width: 100%;height: 80%" @click="handleClear">清空</a-button>
        </div>
      </div>
    </div>
    <a-table :columns="columns" :data-source="dataSource":pagination="false"  :loading="loading" :scroll="scrollObj">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'action'">
        <span>
          操作
        </span>
        </template>
      </template>
      <template #bodyCell="{ column,record  }">
        <template v-if="column.key === 'action'">
          <a style="color: blue;" @click="handleUpdate(record)">修改</a>
        </template>
      </template>
    </a-table>
  </a-card>
<!--  点击修改的dialog-->
  <a-modal v-model:open="open1" title="数据填报" @ok="handleOk1" :width="800">
    <div style="height: 600px;overflow: scroll">
      <!--    上面不能修改的基础信息-->
      <a-form :model="dialogFormState">
        <a-form-item label="年份">
          <a-select
              ref="select"
              disabled
              v-model:value="dialogFormState.year"
              @focus="focus"
          >
            <a-select-option :value="item" v-for="item in yearList" :key="item">{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="学校名称">
          <a-select
              ref="select"
              disabled
              v-model:value="dialogFormState.schoolCode"
              @focus="focus">
            <a-select-option :value="item.value" v-for="item in schoolList" :key="item">{{item.label}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="机构代码">
          <a-input disabled v-model:value="dialogFormState.institutionCode" />
        </a-form-item>
        <a-form-item label="学校类型">
          <a-input disabled v-model:value="dialogFormState.schoolType" />
        </a-form-item>
        <a-form-item label="性质类别">
          <a-input disabled v-model:value="dialogFormState.propertyType" />
        </a-form-item>
        <div v-for="item in listFormItem" :key="item">
          <a-divider></a-divider>
          <div style="font-weight: bold;margin-bottom: 20px;font-size: 18px">{{item.label}}</div>
          <div style="width: 100%;display: flex;flex-wrap: wrap">
            <div style="width: 50%" v-for="item1 in item.children">
              <a-form-item :label="item1.label" >
                <a-input  v-model:value="item1.value" />
              </a-form-item>
            </div>
          </div>
        </div>
      </a-form>
    </div>
  </a-modal>
  <!--  点击数据填报的dialog-->
  <a-modal v-model:open="open2" title="数据填报" @ok="handleOk2" :width="800" @cancel="clearFileds">
    <div style="height: 600px;overflow: scroll">
      <!--    上面不能修改的基础信息-->
      <a-form :model="dialogFormState1" ref="addFormDialog" :rules="rules">
        <a-form-item label="年份" name="year">
          <a-select
              ref="select"
              v-model:value="dialogFormState1.year"
              placeholder="请选择年份"
              @focus="focus"
          >
            <a-select-option :value="item" v-for="item in nearYears" :key="item">{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="学校名称" name="schoolCode">
          <div style="display: flex">
            <a-select
                ref="select"
                v-model:value="dialogFormState1.schoolCode"
                placeholder="请选择学校"
                @change="handleChange"
                @focus="focus">
              <a-select-option :value="item.value" v-for="item in schoolList" :key="item">{{item.label}}</a-select-option>
            </a-select>
            <a-button type="primary" @click="addSchool">新增学校</a-button>
          </div>
        </a-form-item>
        <a-form-item label="机构代码">
          <a-input disabled v-model:value="dialogFormState1.institutionCode" />
        </a-form-item>
        <a-form-item label="学校类型">
          <a-input disabled v-model:value="dialogFormState1.schoolType" />
        </a-form-item>
        <a-form-item label="性质类别">
          <a-input disabled v-model:value="dialogFormState1.propertyType" />
        </a-form-item>
        <div v-for="item in listFormItem1" :key="item">
          <a-divider></a-divider>
          <div style="font-weight: bold;margin-bottom: 20px;font-size: 18px">{{item.label}}</div>
          <div style="width: 100%;display: flex;flex-wrap: wrap">
            <div style="width: 50%" v-for="item1 in item.children">
              <a-form-item :label="item1.label" >
                <a-input  v-model:value="item1.value" />
              </a-form-item>
            </div>
          </div>
        </div>
      </a-form>
    </div>
  </a-modal>
<!--  新增学校的dialog-->
  <a-modal v-model:open="open3" title="新增学校" @ok="handleOk3" :width="800" @cancel="resetAddForm">
    <a-form
        :model="addSchoolForm"
        name="basic"
        ref="addSchoolRef"
        :rules="rules1"
    >
      <a-form-item
          label="学校名称"
          name="schoolName"
      >
        <a-input v-model:value="addSchoolForm.schoolName" />
      </a-form-item>
      <a-form-item
          label="机构代码"
          name="institutionCode"
      >
        <a-input v-model:value="addSchoolForm.institutionCode" />
      </a-form-item>
      <a-form-item
          label="学校类型"
          name="schoolType"
      >
        <a-input v-model:value="addSchoolForm.schoolType" />
      </a-form-item>
      <a-form-item
          label="性质类别"
          name="propertyType"
      >
        <a-input v-model:value="addSchoolForm.propertyType" />
      </a-form-item>
      <a-form-item
          label="省份"
          name="province"
      >
        <a-input v-model:value="addSchoolForm.province" />
      </a-form-item>
    </a-form>
  </a-modal>
</div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {
  addSchoolData,
  fillCoreData,
  getByFileds, getCoreDataItemTree,
  getProvince,
  getSchool,
  getSchoolCoreDataItemTree,
  getTreeData,
  getYears
} from "@/api/coredata";
import {message} from "ant-design-vue";
const formRef=ref()
const yearList=ref([])
const provinceList=ref([])
// 不带有省份查询出来的学校
const schoolList=ref([])
const schoolList1=ref([])
const treeData=ref([])
const open1=ref(false)
const open2=ref(false)
const open3=ref(false)
// for循环的formItem
const listFormItem=ref([])
const listFormItem1=ref([])
const addFormDialog=ref()
const formState=reactive({
  year:null,
  province:null,
  schoolCode:null,
  itemList:[],
})
const dialogFormState=reactive({
  schoolCode:null,
  year:null,
  schoolName:null,
  institutionCode:null,
  schoolType:null,
  propertyType:null,
  schoolData:[],
})
const dialogFormState1=reactive({
  schoolCode:null,
  year:null,
  schoolName:null,
  institutionCode:null,
  schoolType:null,
  propertyType:null,
  schoolData:[],
})
const rules = {
  year: [
    {
      required: true,
      message: '请选择年份',
      trigger: 'blur',
    },
  ],
  schoolCode: [
    {
      required: true,
      message: '请选择学校',
      trigger: 'blur',
    },
  ],
}
const rules1 = {
  schoolName: [
    {
      required: true,
      message: '请输入学校名称',
      trigger: 'blur',
    },
  ],
  institutionCode: [
    {
      required: true,
      message: '请输入机构代码',
      trigger: 'blur',
    },
  ],
  schoolType: [
    {
      required: true,
      message: '请输入学校类型',
      trigger: 'blur',
    },
  ],
  propertyType: [
    {
      required: true,
      message: '请输入性质类别',
      trigger: 'blur',
    },
  ],
  province: [
    {
      required: true,
      message: '请输入省份',
      trigger: 'blur',
    },
  ],

}
const nearYears=ref([])
function getYear(){
  let date = new Date();
  let startYear = date.getFullYear()-5;//起始年份
  let endYear = date.getFullYear()+5;//结束年份
  for (var i=startYear;i<=endYear;i++) {
    nearYears.value.push(i);
  }
  console.log(nearYears.value)
}

onMounted(()=>{
  getYear()
  getYears().then(res=>{
    if (res.result=='ok'){
      yearList.value=res.data
    }
  })
  getProvince().then(res=>{
    if (res.result=='ok'){
      provinceList.value=res.data
    }
  })
  getSchool('').then(res=>{
    if (res.result=='ok'){
      schoolList.value=res.data
      schoolList1.value=res.data
    }
  })
  getTreeData().then(res=>{
    if (res.result=='ok'){
      treeData.value=res.data
    }
  })
})
const handleChangeProvince=()=>{
  formState.schoolCode=null
  getSchool(formState.province).then(res=>{
    if (res.result=='ok'){
      schoolList1.value=res.data
    }
  })
}
const loading=ref(false)
const columns = ref([])
const dataSource = ref([])
const handleClear=()=>{
  console.log(formRef.value)
  formRef.value.resetFields()
}
const scrollObj=ref()
const handleConfirm=()=>{
  loading.value=true
  getByFileds(formState.year,formState.province,formState.schoolCode,formState.itemList).then(res=>{
    if (res.result=='ok'){
      columns.value=res.data.columns
      let col=res.data.columns
      col.push({
        title: '操作',
        key: 'action',
      })
      col.forEach(item=>{
        item.width=150
      })
      scrollObj.value={
        x:col.length*150
      }
      columns.value=col
      console.log(columns.value)
      dataSource.value=res.data.dataSource
      //操作
    }
  }).finally(()=>{
    loading.value=false
  })
}
const handleUpdate=(record)=>{
  // 先发请求判断他有没有修改权限
  getSchoolCoreDataItemTree(record.SCHOOL_CODE,record.YEAR).then(res=>{
    if (res.result!=='ok'){
      message.error('您暂无权限')
    }else {
      listFormItem.value=res.data
      console.log(res.data)
      dialogFormState.schoolCode=record.SCHOOL_CODE
      dialogFormState.year=record.YEAR
      dialogFormState.schoolName=record.SCHOOL_NAME
      dialogFormState.institutionCode=record.INSTITUTION_CODE
      dialogFormState.schoolType=record.SCHOOL_TYPE
      dialogFormState.propertyType=record.PROPERTY_TYPE
      open1.value=true
    }
  })
}
const handleOk1=()=>{
  fillCoreData(dialogFormState.schoolCode,dialogFormState.year,listFormItem.value).then(res=>{
    if (res.result=='ok'){
      open1.value=false
      handleConfirm()
    }
  })
}
const handleOpen2=()=>{
  open2.value=true
  getCoreDataItemTree().then(res=>{
    if (res.result=='ok'){
      listFormItem1.value=res.data
    }
  })
}
const handleChange=(value)=>{
  schoolList.value.forEach(item=>{
    if (item.value==value){
      dialogFormState1.institutionCode=item.institutionCode
      dialogFormState1.schoolType=item.type
      dialogFormState1.propertyType=item.propertyType
    }
  })
}
const handleOk2=()=>{
  addFormDialog.value.validate()
      .then(() => {
        fillCoreData(dialogFormState1.schoolCode,dialogFormState1.year,listFormItem1.value).then(res=>{
          if (res.result=='ok'){
            open2.value=false
            addFormDialog.value.resetFields()
            addFormDialog.value.clearValidate()
            handleConfirm()
          }
        })
      })
}
const clearFileds=()=>{
  addFormDialog.value.resetFields()
  addFormDialog.value.clearValidate()
}
const addSchoolRef=ref()
const addSchoolForm=reactive({
  schoolName: null,
  institutionCode:null ,
  schoolType:null ,
  propertyType:null ,
  province: null
})
const addSchool=()=>{
  open3.value=true
}
const handleOk3=()=>{
  addSchoolRef.value.validate()
      .then(() => {
        addSchoolData(addSchoolForm).then(res=>{
          if (res.result=='ok'){
            message.success('添加成功')
          }
        }).finally(()=>{
          open3.value=false
          getSchool('').then(res=>{
            if (res.result=='ok'){
              schoolList.value=res.data
              schoolList1.value=res.data
            }
          })
        })
      })
}
</script>
<style scoped>
</style>