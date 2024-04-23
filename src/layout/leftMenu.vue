<template>
 <div style="display: flex;flex-direction: column;justify-content:space-between;height: 100%;border-right: 1px solid rgb(240, 240, 240)">
   <div>
     <div class="personInfo1">
       <img src="../../public/fuza.png" height="30">
       复杂任务管理系统
     </div>
     <a-menu :selectedKeys="activeKey" @click="handleClick">
       <a-menu-item key="/index/workbench" @click="$router.push('/index/workbench')">工作台</a-menu-item>
       <a-menu-item key="/index/datalake" @click="$router.push('/index/datalake')">数据湖</a-menu-item>
       <a-menu-item key="3">调度中心</a-menu-item>
       <a-menu-item key="4">
         <a class="head-example">消息</a>
         <a-badge count="25" />
       </a-menu-item>
       <a-menu-item key="5">任务管理中心</a-menu-item>
     </a-menu>
   </div>
   <div class="personInfo">
     <a-avatar size="20" :src="avatarUrl">
     </a-avatar>
     <span style="font-size: 14px;margin-left: 10px">{{username}}</span>
   </div>
 </div>
</template>
<script setup>
import { UserOutlined} from '@ant-design/icons-vue';
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getUserInfo} from "@/api/user";
const route=useRoute()
const activeKey=ref([])
const clearArray=()=>{
  activeKey.value.length=0
}
const username=ref()
const avatarUrl=ref()
onMounted(()=>{
  clearArray()
  activeKey.value.push(route.path)
  //获取用户信息
  getUserInfo().then(res=>{
    if (res.result=='ok'){
      username.value=res.data.userName
      avatarUrl.value='https://bzszkj.com/portal/r'+res.data.photo.replace('.','')
    }
  })
})
const handleClick=({item,key})=>{
  clearArray()
  activeKey.value.push(key)
}
</script>
<style scoped>
.personInfo{
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border-right: 1px solid rgb(240, 240, 240);
}
.personInfo:hover{
  background-color: rgba(0, 0, 0, 0.06);
  cursor: pointer;
}
.personInfo1{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
}
</style>