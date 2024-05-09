<template>
  <div class="workbenchContainer">
    <div class="leftTabs">
      <a-tabs v-model:activeKey="activeKey" @change="handleChange" type="card" tab-position="left" style="height: 100%;overflow: scroll">
        <a-tab-pane key="1" tab="本地上传">
          <localupload v-if="activeKey=='1'"></localupload>
        </a-tab-pane>
        <a-tab-pane key="2" tab="我的空间">
          <common-components space="我的空间" v-if="activeKey=='2'"></common-components>
        </a-tab-pane>
        <a-tab-pane key="3" tab="部门空间">
          <common-components space="部门空间" v-if="activeKey=='3'"></common-components>
        </a-tab-pane>
        <a-tab-pane key="4" tab="学校公共空间">
          <common-components space="学校公共空间" v-if="activeKey=='4'"></common-components>
        </a-tab-pane>
        <a-tab-pane key="5" tab="核心数据管理">
          <coredata v-if="activeKey=='5'"></coredata>
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
import Myspace from "@/components/commonComponents.vue";
import Coredata from "@/components/coredata.vue";
import CommonComponents from "@/components/commonComponents.vue";
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