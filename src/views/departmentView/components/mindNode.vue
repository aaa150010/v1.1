<template>
  <div class="w-full h-full bg-slate-200 px-4 relative">
    <div>{{ dataObj.name }}</div>
    <div>总任务数:{{ dataObj.totalTasks }}</div>
    <div>完成进度:{{ dataObj.schedule }}%</div>
    <div>当前得分:{{ dataObj.score }}分</div>
    <div>{{ dataObj.startTime + "~" + dataObj.endTime }}</div>
    <div
      class="absolute bottom-2 right-2 cursor-pointer"
      v-if="isLeafNode"
      @click="getNode().store.data.openDetail(dataObj)"
    >
      >>
    </div>
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
import { onMounted, ref, shallowRef, inject } from "vue";
import { directive } from "vue3-menus";

import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
import { isLeaf } from "ant-design-vue/es/vc-cascader/utils/commonUtil";
const selectRow = ref({});
const getNode = inject("getNode");
const dataObj = ref({});

// const isLeafNode = ref(getNode().store.data.graph.isLeafNode(getNode()));
const isLeafNode = ref(getNode().store.data.data.isLeaf);

// const isCollapse = ref(getNode().visible);
const isCollapse = ref(getNode().store.data.data.isCollapse);

const selectRowClick = (item) => {
  selectRow.value = item;
};

onMounted(() => {
  dataObj.value = getNode().store.data.data;
});

const toggleCollapse = (flag) => {
  getNode().store.data.toggleCollapse(
    getNode().store.data.data.id,
    !getNode().store.data.data.isCollapse
  );
  // isCollapse.value = !flag;
  // getNode()
  //   .store.data.graph.getSuccessors(getNode())
  //   .forEach((item) => {
  //     item.visible = !flag;
  //   });
};
</script>

<style lang="less" scoped></style>
