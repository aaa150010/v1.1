<template>
  <div
    class="w-full h-full px-4 relative rounded-md"
    :style="
      dataObj.status == '未完成'
        ? 'background-color: #e7e5e4'
        : dataObj.status == '审核中'
        ? 'background-color: #fde68a'
        : 'background-color: #bfdbfe'
    "
  >
    <div
      class="text-blue-400 underline cursor-pointer txt_over_one"
      @click="getNode().store.data.openDetail(dataObj)"
    >
      {{ dataObj.name }}
    </div>
    <div>总任务数:{{ dataObj.totalTasks }}</div>
    <div>完成进度:{{ dataObj.schedule }}%</div>
    <div>
      <span class="text-red-400">目标值</span>/
      <span class="text-blue-400">当前值</span>/
      <span class="text-yellow-600">审核值</span>
      =
      <span class="text-red-400">{{ dataObj.taskScore }}</span
      >/ <span class="text-blue-400">{{ dataObj.score }}</span
      >/
      <span class="text-yellow-600">{{ dataObj.expectedScore }}</span>
      (分)
    </div>
    <div>{{ dataObj.startTime + "~" + dataObj.endTime }}</div>
    <personInfoGlobal
      :name="dataObj.personResponsibleName"
      title="负责人："
      :userId="dataObj.personResponsible"
    />
    <!-- <div
      class="absolute bottom-2 right-2 cursor-pointer underline text-blue-400"
      v-if="isLeafNode"
      @click="getNode().store.data.openDetail(dataObj)"
    >
      >>
    </div> -->
    <div
      v-if="!isLeafNode"
      class="absolute top-1/2 -right-8 -translate-y-1/2 cursor-pointer"
    >
      <div class="p-4 center" @click="toggleCollapse(true)" v-if="isCollapse">
        <MinusCircleOutlined />
      </div>
      <div class="p-4 center" @click="toggleCollapse(false)" v-else>
        <PlusCircleOutlined />
      </div>
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
