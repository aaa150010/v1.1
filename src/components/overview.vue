<template>
  <div>
    <a-card title="工作进度" :bordered="false">
     <div style="display: flex;justify-content: space-around">
       <div>
         <a-progress type="dashboard" :percent="75" />
       </div>
       <div class="oneItem">
         <div style="width: 40px;height: 40px;text-align: center;line-height: 40px">{{workbenchObj.projectNumber}}</div>
         <div>参与的项目数</div>
       </div>
       <div class="oneItem" @click="handleItem('未完成')">
         <a-button type="link" size="large">{{ workbenchObj.unCompleteTaskNumber }}</a-button>
         <div >未完成任务数</div>
       </div>
       <div class="oneItem" @click="handleItem('待审核')">
         <a-button type="link" size="large">{{ workbenchObj.reviewTaskNumber }}</a-button>
         <div >待审核任务数</div>
       </div>
       <div class="oneItem" @click="handleItem('已完成')">
         <a-button type="link" size="large">{{ workbenchObj.completeTaskNumber }}</a-button>
         <div >已完成任务数</div>
       </div>
     </div>
    </a-card>
    <a-card title="时间预警" :bordered="false">
      <div style="display: flex;justify-content: space-around">
        <div class="oneItem">
          <a-button type="link" size="large">{{ workbenchObj.warningTaskNumber }}</a-button>
          <div>耗时过半的任务</div>
        </div>
        <div class="oneItem">
          <a-button type="link" size="large">{{ workbenchObj.overdueTaskNumber }}</a-button>
          <div>逾期的任务</div>
        </div>
      </div>
    </a-card>
    <a-card title="我的关注" :bordered="false" style="margin-top: 10px">
      <template  v-for="(item1,index) in 3" :key="index">
        <div style="display: flex;justify-content: space-between">
          <div class="itemTitle">
            <div class="itemDesc">2023高等职业学校综合考核</div>
            <div>启动时间：2024.2.1 9:00:00</div>
            <div>截止时间：2024.2.4 9:00:00</div>
          </div>
          <div v-for="item2 in 4" class="oneItem">
            <a-button type="link" size="large">18</a-button>
            <div>参与的项目数</div>
          </div>
        </div>
        <a-divider  v-if="index!==2"/>
      </template>
    </a-card>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {getFollowProjectList, getTaskInfoList, getWorkbench} from "@/api/overview";
const workbenchObj=ref({
  completeTaskNumber:0,
  overdueTaskNumber:0,
  projectNumber:0,
  reviewTaskNumber:0,
  unCompleteTaskNumber:0,
  warningTaskNumber:0,
})
const FollowProjectList=ref([])
onMounted(()=>{
  //获取工作台信息
  getWorkbench().then(res=>{
    if (res.result=='ok'){
      console.log(res.data)
      workbenchObj.value.completeTaskNumber=res.data.completeTaskNumber
      workbenchObj.value.overdueTaskNumber=res.data.overdueTaskNumber
      workbenchObj.value.projectNumber=res.data.projectNumber
      workbenchObj.value.reviewTaskNumber=res.data.reviewTaskNumber
      workbenchObj.value.unCompleteTaskNumber=res.data.unCompleteTaskNumber
      workbenchObj.value.warningTaskNumber=res.data.warningTaskNumber
    }
  })
  //获取关注信息
  getFollowProjectList().then(res=>{
    if (res.result=='ok'){
      console.log(res.data)
    }
  })
})
const handleItem=(status)=>{
  console.log(status)
  getTaskInfoList(status,true,'')
}
</script>
<style scoped>
.oneItem{
  padding: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.itemTitle{
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
}
.itemDesc{
  font-size: 18px;
  font-weight: bold;
}
</style>