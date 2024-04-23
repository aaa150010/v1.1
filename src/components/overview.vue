<template>
  <div>
    <a-card title="工作进度" :bordered="false">
     <div style="display: flex;justify-content: space-around">
       <div>
         <a-progress type="dashboard" :percent="75" />
       </div>
       <div v-for="item in 6" class="oneItem">
         <a-button type="link" size="large">18</a-button>
         <div>参与的项目数</div>
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
import {onMounted} from "vue";
onMounted(()=>{

})
</script>
<style scoped>
.oneItem{
  padding: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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