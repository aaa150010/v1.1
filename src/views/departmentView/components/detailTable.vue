<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" @change="getTaskList">
      <a-tab-pane key="0" tab="未完成任务"></a-tab-pane>
      <a-tab-pane key="1" tab="待审核任务"></a-tab-pane>
      <a-tab-pane key="2" tab="已完成任务"></a-tab-pane>
      <a-tab-pane key="3" tab="全部任务"></a-tab-pane>
    </a-tabs>
    <a-table
      :dataSource="dataSource"
      :columns="filterColumns"
      bordered
      style="margin-bottom: 8px"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'taskDescription'">
          <span>{{ text }}</span>
          <span
            class="cursor-pointer text-blue-400 float-right"
            @click="openDetail(record)"
            >查看详情</span
          >
        </template>
        <template v-else-if="column.dataIndex == 'executorName'">
          <personInfoGlobal
            :name="record.executorName"
            :userId="record.executor"
          />
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="detailVisible"
      title="查看详细"
      @ok="handleOk"
      width="800px"
      destroyOnClose
      :footer="null"
    >
      <div>
        <div>任务名称：{{ taskDetail.taskName }}</div>
        <div>任务说明：{{ taskDetail.taskDescription }}</div>
        <div>任务下发时间：{{ taskDetail.issuingTime }}</div>
        <div>任务截止时间： {{ taskDetail.endTime }}</div>
        <div>责任部门：{{ taskDetail.executionDepartmentName }}</div>
        <div>任务状态：{{ taskDetail.status }}</div>
      </div>
      <a-divider></a-divider>
      <div style="height: 500px; overflow-y: auto">
        <div v-for="item in taskDetail.feedback" :key="item.feedbackCode">
          <div>
            <div>执行部门：{{ item.feedbackDepartmentName }}</div>
            <div>
              执行人：
              <personInfoGlobal
                :name="item.feedbackPersonName"
                :userId="item.feedbackPerson"
              />
            </div>
            <div>任务反馈时间： {{ item.submissionTime }}</div>
            <div>任务反馈说明： {{ item.progressFeedback }}</div>
            <div>
              任务反馈附件：
              <div
                v-for="(itemFile, index) in item.supportingMaterials"
                :key="index"
              >
                <a
                  class="text-blue-400 underline"
                  @click="handleDown(itemFile)"
                  >{{ itemFile.fileName }}</a
                >
              </div>
            </div>
            <div>任务自评分： {{ item.selfScore }}分</div>
          </div>
          <a-divider></a-divider>
          <div>
            <div>提交审核时间：{{ item.submissionTime }}</div>
            <div>审核时间： {{ item.reviewData.auditTime }}</div>
            <div>审核部门： {{ item.reviewData.auditDepartmentName }}</div>
            <div>
              审核人：
              <personInfoGlobal
                :name="item.reviewerName"
                :userId="item.reviewer"
              />
            </div>
            <div>审核意见：{{ item.reviewData.auditResult }}</div>
            <div>审核说明： {{ item.reviewData.reviewComments }}</div>
          </div>
          <a-divider></a-divider>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch, computed } from "vue";
import {
  getTaskByDepartmentIdApi,
  getTaskByTaskCodeApi,
  getTaskDetailByCodeApi,
} from "@/api/departmentView.js";
import download from "downloadjs";
const activeKey = ref("3");
const props = defineProps(["selectRow", "type"]);
const detailVisible = ref(false);

onMounted(async () => {
  await getTaskList();
});

const selectRow = ref({});

const taskDetail = ref({});

const dataSource = ref([
  // {
  //   targetName: "落实意识形态工作责任制考核得分",
  //   targetDescription: "运用意识形态工作责任制落实考核结果，原始得分",
  //   executionDepartmentName: "计算机学院党委宣传科",
  //   executorName: "李晓",
  //   status: "未完成",
  //   // 发布时间
  //   issuingTime: "2024-1-2 10:00:00",
  //   // 结束时间
  //   endTime: "2024-1-2 10:00:00",
  //   // 提交时间
  //   submissionTime: "2024-1-2 10:00:00",
  //   // 审批时间
  //   approvalTime: "2024-1-2 10:00:00",
  //   // 消耗时间
  //   involvement: "45天10小时",
  //   auditDepartmentName: "党委宣传部",
  //   taskScore: "2",
  // },
]);
const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    align: "center",
    width: 80,
    customRender: ({ text, record, index }) => {
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
    key: "taskDescription",
  },
  {
    title: "任务下发时间",
    align: "center",
    dataIndex: "issuingTime",
    key: "issuingTime",
    filter: ["0", "2"],
  },
  {
    title: "结束时间",
    align: "center",
    dataIndex: "endTime",
    key: "endTime",
    filter: [],
  },
  {
    title: "提交审核时间",
    align: "center",
    dataIndex: "submissionTime",
    key: "submissionTime",
    filter: ["1"],
  },
  {
    title: "审核通过时间",
    align: "center",
    dataIndex: "approvalTime",
    key: "approvalTime",
    filter: ["2"],
  },
  {
    title: "任务得分",
    align: "center",
    dataIndex: "taskScore",
    key: "taskScore",
    width: 200,
    filter: ["2"],
  },
  {
    title: "任务已消耗时间",
    align: "center",
    dataIndex: "involvement",
    key: "involvement",
    filter: ["0"],
  },
  {
    title: "执行部门",
    align: "center",
    dataIndex: "executionDepartmentName",
    key: "executionDepartmentName",
    filter: ["0", "3"],
  },
  {
    title: "执行人",
    align: "center",
    width: 150,
    dataIndex: "executorName",
    key: "executorName",
    filter: ["0", "3"],
  },
  {
    title: "审核部门",
    align: "center",
    width: 100,
    dataIndex: "auditDepartmentName",
    key: "auditDepartmentName",
    filter: ["1"],
  },
  {
    title: "状态",
    align: "center",
    width: 100,
    dataIndex: "status",
    key: "status",
    filter: ["3"],
  },
]);

const filterColumns = computed(() => {
  return columns.value.filter((item) => {
    if (!item.filter) {
      return true;
    } else {
      return item.filter.includes(activeKey.value);
    }
  });
});

const openDetail = async (item) => {
  selectRow.value = item;
  await getTaskDetailByCode();
  detailVisible.value = true;
};

const getTaskList = () => {
  let type = "all";
  switch (activeKey.value) {
    case "0":
      type = "todo";
      break;
    case "1":
      type = "audit";
      break;
    case "2":
      type = "completed";
      break;
    case "3":
      type = "all";
      break;
  }
  switch (props.type) {
    case "department":
      return getTaskByDepartmentIdApi({
        departmentId: props.selectRow.responsibleDepartment,
        projectCode: props.selectRow.projectCode,
        type,
      }).then((res) => {
        if (res.result == "ok") {
          dataSource.value = res.data;
        }
      });
    default:
      return getTaskByTaskCodeApi({
        taskCode: props.selectRow.taskCode,
        projectCode: props.selectRow.projectCode,
        type,
      }).then((res) => {
        if (res.result == "ok") {
          dataSource.value = res.data;
        }
      });
  }
};

const getTaskDetailByCode = () => {
  return getTaskDetailByCodeApi({
    taskCode: selectRow.value.taskCode,
  }).then((res) => {
    if (res.result == "ok") {
      taskDetail.value = res.data;
    }
  });
};

const handleDown = (item) => {
  let link = `${import.meta.env.VITE_APP_BASE_API}/portal/r${item.url.replace(
    ".",
    ""
  )}&sid=${localStorage.getItem("sid")}`;
  download(link, item.name);
};
</script>

<style></style>
