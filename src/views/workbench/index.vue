<template>
<div class="workbenchContainer">
  <div class="leftTabs">
    <a-tabs v-model:activeKey="activeKey" @change="handleChange" type="card" tab-position="left" style="height: 100%;overflow: scroll">
      <a-tab-pane key="1" tab="概览">
        <overview v-if="activeKey=='1'"></overview>
      </a-tab-pane>
      <a-tab-pane key="2" tab="我的待办">
        <workprogress v-if="activeKey=='2'"></workprogress>
      </a-tab-pane>
      <a-tab-pane key="3" tab="我的已办">
        <already-done v-if="activeKey=='3'"></already-done>
      </a-tab-pane>
      <a-tab-pane key="4" tab="我的关注">
        <focus v-if="activeKey=='4'"></focus>
      </a-tab-pane>
    </a-tabs>
  </div>
  <div>

  </div>
</div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import Workprogress from "@/components/workprogress.vue";
import Overview from "@/components/overview.vue";
import AlreadyDone from "@/components/alreadyDone.vue";
import Focus from "@/components/focus.vue";
const activeKey = ref('1');
onMounted(()=>{

})
</script>
<style scoped>
.workbenchContainer{
  width: 100%;
  height: 100%;
}
.leftTabs{
  width: 100%;
  height: 100%;
}

</style>