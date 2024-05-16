<template>
  <div class="h-full flex">
    <div
      class="border w-56 h-full mr-2 p-2"
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
        <div>{{ itemChild.name }}</div>
        <div>任务总数：{{ itemChild.totalTasks }}</div>
        <div>完成进度：{{ itemChild.schedule }}%</div>
        <div>当前得分：{{ itemChild.score }}分</div>
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
      <div class="flex justify-between">
        <div>责任部门：{{ selectRow.responsibleDepartmentName }}</div>
        <div>进展：{{ selectRow.evolve }}%</div>
      </div>
      <detailTable :selectRow="selectRow" />
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
