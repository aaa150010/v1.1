<template>
  <div class="w-full h-full bg-slate-200 px-4 relative" @click="toggleCollapse">
    <div>{{ dataObj.name }}</div>
    <div>总任务数:{{ dataObj.totalTasks }}</div>
    <div>完成进度:{{ dataObj.schedule }}%</div>
    <div>当前得分:{{ dataObj.score }}分</div>
    <div>{{ dataObj.startTime + "~" + dataObj.endTime }}</div>
    <span
      class="absolute right-2 bottom-2 cursor-pointer text-lg"
      @click.stop="selectRowClick(dataObj)"
      v-menus:left="menus"
      >...</span
    >
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

const menus = shallowRef({
  menus: [
    {
      label: "新增子任务",
      click: () => {
        getNode().store.data.addNode(selectRow.value);
      },
    },
    {
      label: "修改",
      click: () => {
        getNode().store.data.updateNode(selectRow.value);
      },
    },
    {
      label: "删除",
      click: () => {
        getNode().store.data.deleteNode(selectRow.value);
      },
    },
    {
      label: "设置数据大屏",
      tip: "ESC全屏查看",
      click: () => {},
    },
  ],
});

const vMenus = directive;

onMounted(() => {
  dataObj.value = getNode().store.data.data;
});

const toggleCollapse = () => {
  //   console.log(getNode().store.data);
  //   getNode().toggleCollapse();
};
</script>

<style lang="less" scoped></style>
