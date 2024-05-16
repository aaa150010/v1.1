<template>
  <a-modal v-model:open="open" title="个人信息" @ok="handleOk">
    <div class="fieldItem">
      姓名：{{personObj.userName}}
    </div>
    <div class="fieldItem">
      工号：
    </div>
    <div class="fieldItem">
      所属部门：{{personObj.companyName}}
    </div>
    <div class="fieldItem">
      座机电话：
    </div>
    <div class="fieldItem">
      移动电话：
    </div>
  </a-modal>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {getUserInfoByInfo} from "@/api/user";
const open=ref(false)
const props=defineProps({
  userId:{required:true,type:String}
})
const personObj=ref()
const openModel=()=>{
  getUserInfoByInfo(props.userId).then(res=>{
    if (res.result=='ok'){
      console.log(res.data)
      personObj.value=res.data
      open.value=true
    }
  })
}
const closeModel=()=>{
  open.value=false
}
const handleOk=()=>{
  open.value=false
}
defineExpose({openModel,closeModel})
</script>
<style scoped>
.fieldItem{
  height: 32px;
  margin-bottom: 24px;
}
</style>