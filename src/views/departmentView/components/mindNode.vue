<template>
  <div class="w-full h-full bg-slate-200 px-4 relative" @click="toggleCollapse">
    <div>{{ dataObj.name }}</div>
    <div>总任务数:{{ dataObj.totalTasks }}</div>
    <div>完成进度:{{ dataObj.schedule }}%</div>
    <div>当前得分:{{ dataObj.score }}分</div>
    <div>{{ dataObj.startTime + "~" + dataObj.endTime }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref, shallowRef, inject } from "vue";
import { directive } from "vue3-menus";
const selectRow = ref({});
const getNode = inject("getNode");
const dataObj = ref({});
const selectRowClick = (item) => {
  selectRow.value = item;
};

onMounted(() => {
  dataObj.value = getNode().store.data.data;
});

const toggleCollapse = () => {
  //   console.log(getNode().store.data);
  //   getNode().toggleCollapse();
};
</script>

<style lang="less" scoped></style>
