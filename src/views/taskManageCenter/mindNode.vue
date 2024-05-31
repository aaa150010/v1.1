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
    @contextmenu.prevent.stop="selectRowClick(dataObj)"
    v-menus:right="
      getNode().store.data.data.havePermission &&
      getNode().store.data.data.status != '已完成'
        ? menus
        : []
    "
  >
    <div
      class="text-blue-400 underline cursor-pointer txt_over_one"
      @click="getNode().store.data.seeDetail(dataObj)"
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
      :userId="dataObj.personResponsible"
      title="负责人："
    />
    <span
      class="absolute right-2 bottom-2 cursor-pointer text-lg"
      @click.stop="selectRowClick(dataObj)"
      v-if="
        getNode().store.data.data.havePermission &&
        getNode().store.data.data.status != '已完成'
      "
      v-menus:left="menus"
      >...</span
    >
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
import { onMounted, ref, shallowRef, inject, watch } from "vue";
import { directive } from "vue3-menus";

import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
const selectRow = ref({});
const getNode = inject("getNode");
const dataObj = ref({});

const selectRowClick = (item) => {
  selectRow.value = item;
};

// const isLeafNode = ref(getNode().store.data.graph.isLeafNode(getNode()));
const isLeafNode = ref(getNode().store.data.data.isLeaf);

// const isCollapse = ref(getNode().visible);
const isCollapse = ref(getNode().store.data.data.isCollapse);

const menus = shallowRef({
  menus: [
    {
      label: "新增子任务",
      click: () => {
        getNode().store.data.addNode(
          selectRow.value,
          getNode().store.data.graph.getNodes()
        );
      },
    },
    {
      label: "修改",
      click: () => {
        getNode().store.data.updateNode(
          selectRow.value,
          getNode().store.data.graph.getNodes()
        );
      },
    },
    {
      label: "删除",
      click: () => {
        getNode().store.data.deleteNode(
          selectRow.value,
          getNode().store.data.graph.getNodes()
        );
      },
    },
    {
      label: "查看详情",
      click: () => {
        getNode().store.data.seeDetail(
          selectRow.value,
          getNode().store.data.graph.getNodes()
        );
      },
    },
  ],
});

const vMenus = directive;

onMounted(() => {
  dataObj.value = getNode().store.data.data;

  console.log(
    getNode().store.data.data.havePermission &&
      dataObj.value.status != "已完成",
    9
  );
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
