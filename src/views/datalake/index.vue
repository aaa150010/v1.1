<template>
  <div class="workbenchContainer">
    <div class="leftTabs">
      <a-tabs v-model:activeKey="activeKey" @change="handleChange" type="card" tab-position="left" style="height: 100%;overflow: scroll">
        <a-tab-pane key="1" tab="本地上传">
          <localupload v-if="activeKey=='1'"></localupload>
        </a-tab-pane>
        <a-tab-pane key="2" tab="我的空间">
          <myspace v-if="activeKey=='2'"></myspace>
        </a-tab-pane>
        <a-tab-pane key="3" tab="部门空间">
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </a-tab-pane>
        <a-tab-pane key="4" tab="学校公共空间">
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </a-tab-pane>
        <a-tab-pane key="5" tab="核心数据管理">
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
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
import Localupload from "@/components/localupload.vue";
import Myspace from "@/components/myspace.vue";
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