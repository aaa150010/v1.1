<template>
  <div class="h-full w-full overflow-x-auto" style="white-space: nowrap">
    <div
      class="inline-block border w-64 h-full overflow-y-auto mr-2 p-2"
      v-for="item in dataTree"
      :key="item.id"
    >
      <div class="flex justify-between">
        <div>
          <div>{{ item.name }}</div>
          <a-progress
            :percent="item.schedule"
            :size="8"
            strokeLinecap="square"
            class="w-36"
          />
        </div>
        <a-button size="small" @click="openDetail(item)">详情</a-button>
      </div>
      <a-divider class="my-1" />
      <div
        class="border clear-right mb-2 p-2"
        v-for="itemChild in item.children"
        :key="itemChild.id"
      >
        <a-tooltip>
          <template #title>{{ itemChild.name }}</template>
          <div class="txt_over_one cursor-pointer">{{ itemChild.name }}</div>
        </a-tooltip>

        <div>任务总数：{{ itemChild.totalTasks }}</div>
        <div>完成进度：{{ itemChild.schedule }}%</div>
        <div>
          <span class="text-red-400">目标</span>/
          <span class="text-blue-400">当前</span>/
          <span class="text-yellow-600">审核</span>(值) =
          <span class="text-red-400">{{ itemChild.taskScore }}</span
          >/ <span class="text-blue-400">{{ itemChild.score }}</span
          >/
          <span class="text-yellow-600">{{ itemChild.expectedScore }}</span>
          (分)
        </div>
        <div>{{ itemChild.startTime }}~{{ itemChild.endTime }}</div>
        <div
          class="float-right text-blue-400 underline cursor-pointer"
          @click="openDetail(itemChild)"
        >
          >>
        </div>
        <div class="clear-right"></div>
      </div>
      <a-empty
        v-if="item.children.length == 0"
        :image-style="{
          height: '50px',
        }"
        class="text-sm"
        description="暂无数据"
      />
    </div>
    <a-empty
      v-if="dataTree.length == 0"
      :image-style="{
        height: '50px',
      }"
      class="text-sm"
      description="暂无数据"
    />
    <a-modal
      v-model:open="detailDeptVisible"
      title="看板视图-明细"
      @ok="detailDeptOk"
      destroyOnClose
      style="width: 1000px"
      :footer="null"
    >
      <div style="height: 650px">
        <div class="flex justify-between">
          <div>责任部门：{{ selectRow.responsibleDepartmentName }}</div>
          <div>进展：{{ selectRow.evolve }}%</div>
        </div>
        <detailTable :selectRow="selectRow" />
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import { getProjectTreeApi } from "@/api/taskManage.js";
import detailTable from "../components/detailTable.vue";

const props = defineProps(["selectRow"]);

const dataTree = ref([]);

onMounted(async () => {
  await getProjectTree();
});

const getProjectTree = () => {
  return getProjectTreeApi({
    projectCode: props.selectRow.projectCode,
    type: "Kanban",
  }).then((res) => {
    if (res.result == "ok") {
      dataTree.value = res.data;
    }
  });
};

watch(
  () => props.selectRow,
  async () => {
    await getProjectTree();
  }
);

const selectRow = ref({});
const detailDeptVisible = ref(false);

const openDetail = (item) => {
  selectRow.value = { ...item, ...props.selectRow, evolve: item.schedule };
  console.log(selectRow.value);
  detailDeptVisible.value = true;
};

const detailDeptOk = () => {};
</script>

<style></style>
