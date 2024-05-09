<template>
  <div class="w-full h-full bg-slate-200 px-4 relative" @click="toggleCollapse">
    <div>{{ dataObj.id + dataObj.label }}</div>
    <div>总任务数:100</div>
    <div>完成进度:8.3%</div>
    <div>当前得分:1分</div>
    <div>2023.2.1~2024.2.1</div>
    <span
      class="absolute right-2 bottom-2 cursor-pointer text-lg"
      @click.stop="selectRowClick({})"
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
