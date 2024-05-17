<template>
  <div
    class="w-full text-white h-screen bg-cover"
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
        <a-radio-group
          class="mb-4 mt-12"
          v-model:value="switchValue"
          button-style="solid"
        >
          <a-radio-button value="unfinished">未完成任务</a-radio-button>
          <a-radio-button value="finished">已完成任务</a-radio-button>
        </a-radio-group>
        <a-table
          :dataSource="dataSource"
          :columns="filterColumns"
          bordered
          style="margin-bottom: 8px"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex == 'operation'">
              <span
                class="cursor-pointer text-blue-400"
                @click="seeDetail(record)"
                >查看明细</span
              >
            </template>
          </template>
        </a-table>
      </div>
    </dv-border-box-11>
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
  computed,
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

const dataSource = ref([]);
const switchValue = ref(route.query.type);

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
    title: "责任部门",
    align: "center",
    dataIndex: "departmentName",
    key: "departmentName",
  },
  {
    title: "待办任务数",
    dataIndex: "unCompleteTaskListSize",
    align: "center",
    key: "unCompleteTaskListSize",
    filter: ["unfinished"],
  },
  {
    title: "已完成任务数",
    dataIndex: "completeTaskListSize",
    align: "center",
    key: "completeTaskListSize",
    filter: ["finished"],
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "operation",
    key: "operation",
  },
]);

const filterColumns = computed(() => {
  return columns.value.filter((item) => {
    if (!item.filter) {
      return true;
    } else {
      return item.filter.includes(switchValue.value);
    }
  });
});

let bgUrl = isDev ? "/bg.png" : "/portal/console/images/bg.png";

onMounted(async () => {
  await getTaskByDepartment();
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

const getTaskByDepartment = () => {
  return getTaskByDepartmentApi({
    projectCode: route.query.projectCode,
  }).then((res) => {
    if (res.result == "ok") {
      dataSource.value = res.data;
    }
  });
};

const seeDetail = (item) => {
  router.push({
    path: "/wisdomDataV_dataV1_index5",
    query: {
      ...route.query,
      type: switchValue.value,
      departmentName: item.departmentName,
      departmentId: item.departmentCode,
    },
  });
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
