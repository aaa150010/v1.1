<template>
  <div
    class="w-full text-white h-screen"
    :style="'background-image: url(' + bgUrl + ');'"
  >
    <dv-border-box-11
      :title="route.query.taskName"
      :titleWidth="400"
      :color="['#0dd5f4', '#0a2732']"
      class="py-14"
    >
      <div class="mx-8 h-full overflow-y-auto hideScroll">
        <div class="center relative">
          <div class="absolute top-2 right-32 text-base">
            <timeNow />
          </div>
          <div
            class="absolute top-2 left-6 text-base underline cursor-pointer hover:text-blue-400"
            @click="goBack"
          >
            {{ "<<返回" }}
          </div>
          <div
            class="absolute top-2 left-40 text-base underline cursor-pointer hover:text-blue-400"
            @click="seeProgress"
          >
            {{ "首页" }}
          </div>
        </div>
        <div class="mt-12 mb-4 text-base">
          负责部门：{{ route.query.departmentName }}
        </div>
        <a-table
          :dataSource="dataSource"
          :columns="columns"
          bordered
          style="margin-bottom: 8px"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex == 'operation'">
              <span
                class="cursor-pointer text-blue-400"
                @click="openDetail(record)"
                >查看详细</span
              >
            </template>
          </template>
        </a-table>
      </div>
    </dv-border-box-11>
    <a-modal
      v-model:open="detailVisible"
      title="查看详细"
      @ok="handleOk"
      width="800px"
      destroyOnClose
      :footer="null"
    >
      <div>
        <div>任务名称：{{ selectRow.taskName }}</div>
        <div>任务说明：{{ selectRow.taskDescription }}</div>
        <div>任务下发时间：{{ selectRow.startTime }}</div>
        <div>任务截止时间： {{ selectRow.endTime }}</div>
        <div>责任部门：{{ selectRow.departmentName }}</div>
        <div>任务状态：{{ selectRow.status }}</div>
      </div>
      <a-divider></a-divider>
    </a-modal>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  reactive,
  defineComponent,
  shallowRef,
  onUnmounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { get, post } from "@/awsuiAxios/index.js";
import isDev from "@/config/index.js";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import timeNow from "./component/timeNow.vue";
import {
  getTaskByDepartmentApi,
  getDepartmentTaskApi,
} from "@/api/wisdomDataV.js";
import countTo from "@/components/countTo";

const router = useRouter();
const route = useRoute();

const detailVisible = ref(false);
const dataSource = ref([]);

const selectRow = ref({});

const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    align: "center",
    width: 80,
    customRender: ({ index }) => {
      return `${index + 1}`;
    },
  },
  {
    title: "任务名称",
    align: "center",
    dataIndex: "taskName",
    key: "taskName",
  },
  {
    title: "任务说明",
    dataIndex: "taskDescription",
    align: "center",
    key: "taskDescription",
  },
  {
    title: "执行部门",
    dataIndex: "departmentName",
    align: "center",
    key: "departmentName",
  },
  {
    title: "执行人",
    dataIndex: "responsiblePersonName",
    align: "center",
    key: "responsiblePersonName",
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "operation",
    key: "operation",
  },
]);

let bgUrl = isDev ? "/bg.png" : "/portal/console/images/bg.png";

onMounted(async () => {
  await getDepartmentTask();
});

const goBack = () => {
  router.go(-1);
};

const seeProgress = () => {
  router.push({
    path: "/wisdomDataV_dataV1_index1",
    query: { ...route.query },
  });
};

const getDepartmentTask = () => {
  return getDepartmentTaskApi({
    projectCode: route.query.projectCode,
    status: route.query.type == "unfinished" ? "未完成" : "已完成",
    departmentId: route.query.departmentId,
  }).then((res) => {
    if (res.result == "ok") {
      dataSource.value = res.data;
    }
  });
};

const openDetail = (item) => {
  selectRow.value = item;
  detailVisible.value = true;
};
</script>

<style lang="less" scoped>
.height1 {
  height: calc(100% - 60px);
}
.width1 {
  width: calc(100% - 2rem);
}
</style>
