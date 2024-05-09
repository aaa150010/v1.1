<template>
<div class="coredataContainer">
  <a-button type="primary">数据填报</a-button>
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
                 <a-select-option :value="item.value" v-for="item in schoolList" :key="item">{{item.label}}</a-select-option>
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
    <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" :loading="loading">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'action'">
        <span>
          操作
        </span>
        </template>
      </template>
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a style="color: blue;">修改</a>
        </template>
      </template>
    </a-table>
  </a-card>
</div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {getByFileds, getProvince, getSchool, getTreeData, getYears} from "@/api/coredata";
const formRef=ref()
const yearList=ref([])
const provinceList=ref([])
const schoolList=ref([])
const treeData=ref([])
const formState=reactive({
  year:null,
  province:null,
  schoolCode:null,
  itemList:[],
})
onMounted(()=>{
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
  getSchool().then(res=>{
    if (res.result=='ok'){
      schoolList.value=res.data
    }
  })
  getTreeData().then(res=>{
    if (res.result=='ok'){
      treeData.value=res.data
    }
  })
})
const loading=ref(false)
const pagination =reactive({
  total: 10,
  current: 1,
  pageSize: 5,
  // onChange: pageChange
});
const columns = ref([])
const dataSource = ref([])
const handleClear=()=>{
  console.log(formRef.value)
  formRef.value.resetFields()
}
const handleConfirm=()=>{
  getByFileds(formState.year,formState.province,formState.schoolCode,formState.itemList).then(res=>{
    if (res.result=='ok'){
      console.log(res.data)
      columns.value=res.data.columns
      dataSource.value=res.data.dataSource
      //操作
      columns.value.push({
        title: '操作',
        key: 'action',
      },)
    }
  })
}
</script>
<style scoped>
</style>