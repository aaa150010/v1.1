# Vue 3 + Typescript + Vite

### 全局消息提示
import { message } from 'ant-design-vue';

成功提示

message.success('This is a success message');

警告提示

message.error('This is an error message');

错误提示

message.warning('This is a warning message');

# 右侧切换型tab栏

```javascript
<template>
<div class="workbenchContainer">
  <div class="leftTabs">
    <a-tabs v-model:activeKey="activeKey" @change="handleChange" type="card" tab-position="left" style="height: 100%;overflow: scroll">
      <a-tab-pane key="1" tab="概览">
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
      </a-tab-pane>
      <a-tab-pane key="2" tab="我的待办">
       <workprogress v-if="activeKey=='2'"></workprogress>
      </a-tab-pane>
      <a-tab-pane key="3" tab="我的已办">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </a-tab-pane>
      <a-tab-pane key="4" tab="我的关注">
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
```

