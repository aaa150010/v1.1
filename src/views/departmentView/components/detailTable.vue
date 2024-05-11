<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
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
        <template v-if="column.dataIndex == 'targetDescription'">
          <span>{{ text }}</span>
          <span
            class="cursor-pointer text-blue-400 float-right"
            @click="openDetail(record)"
            >查看详情</span
          >
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
        <div>任务名称：落实意识形态工作责任制考核得分（1分）</div>
        <div>
          任务说明：
          运用意识形态工作责任制落实考核结果。原始得分最高得1分，低于60分得0分，其他情况采用比率法计分。
        </div>
        <div>任务下发时间：2024.1.1 10:00:00</div>
        <div>任务截止时间： 2024.6.25 18:00:00</div>
        <div>责任部门：党委宣传部（党委统战部）</div>
        <div>任务状态：未完成</div>
      </div>
      <a-divider></a-divider>
      <div>
        <div>执行部门：计算机学院党委宣传科</div>
        <div>执行人： 李晓 (0212341)</div>
        <div>任务反馈时间： 2024.1.12 10:00:00</div>
        <div>
          任务反馈说明： 已完成工作责任制考核工作，具体评分表如附件所述。
        </div>
        <div>任务反馈附件： 意识形态工作责任制评分.xls</div>
        <div>任务自评分： 1分</div>
      </div>
      <a-divider></a-divider>
      <div>
        <div>提交审核时间：2024.1.12 10:00:00</div>
        <div>审核时间： 2024.1.13 13:50:00</div>
        <div>审核部门： 党委宣传部</div>
        <div>审核人： 王毅(0212301)</div>
        <div>审核意见： 驳回</div>
        <div>审核说明： 附件数据错误，请重新提报、反馈</div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch, computed } from "vue";

const activeKey = ref("3");

const detailVisible = ref(false);

const selectRow = ref({});

const dataSource = ref([
  {
    targetName: "落实意识形态工作责任制考核得分",
    targetDescription: "运用意识形态工作责任制落实考核结果，原始得分",
    executionDepartmentName: "计算机学院党委宣传科",
    executorName: "李晓",
    status: "未完成",
    // 发布时间
    issuingTime: "2024-1-2 10:00:00",
    // 结束时间
    endTime: "2024-1-2 10:00:00",
    // 提交时间
    submissionTime: "2024-1-2 10:00:00",
    // 审批时间
    approvalTime: "2024-1-2 10:00:00",

    // 消耗时间
    involvement: "45天10小时",
    auditDepartmentName: "党委宣传部",
    taskScore: "2",
  },
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
    dataIndex: "targetName",
    key: "targetName",
  },
  {
    title: "任务说明",
    dataIndex: "targetDescription",
    key: "targetDescription",
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
    width: 100,
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

const openDetail = (item) => {
  selectRow.value = item;
  detailVisible.value = true;
};
</script>

<style></style>
