<template>
  <div class="w-full h-full bg-slate-200 px-4 relative">
    <div>{{ dataObj.name }}</div>
    <div>总任务数:{{ dataObj.totalTasks }}</div>
    <div>完成进度:{{ dataObj.schedule }}%</div>
    <div>当前得分:{{ dataObj.score }}分</div>
    <div>{{ dataObj.startTime + "~" + dataObj.endTime }}</div>
    <span
      class="absolute right-2 bottom-2 cursor-pointer text-lg"
      @click.stop="selectRowClick(dataObj)"
      v-if="getNode().store.data.data.havePermission"
      v-menus:left="menus"
      >...</span
    >
    <div
      v-if="!isLeafNode"
      class="absolute top-1/2 -right-4 -translate-y-1/2 cursor-pointer"
    >
      <MinusCircleOutlined @click="toggleCollapse(true)" v-if="isCollapse" />
      <PlusCircleOutlined @click="toggleCollapse(false)" v-else />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, shallowRef, inject, watch } from "vue";
import { directive } from "vue3-menus";

import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
const selectRow = ref({});
const getNode = inject("getNode");
const dataObj = ref({});

const selectRowClick = (item) => {
  selectRow.value = item;
};

const isLeafNode = ref(getNode().store.data.graph.isLeafNode(getNode()));

const isCollapse = ref(getNode().visible);

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
  ],
});

const vMenus = directive;

onMounted(() => {
  dataObj.value = getNode().store.data.data;
});

const toggleCollapse = (flag) => {
  isCollapse.value = !flag;
  getNode()
    .store.data.graph.getSuccessors(getNode())
    .forEach((item) => {
      item.visible = !flag;
    });
};
</script>

<style lang="less" scoped></style>
