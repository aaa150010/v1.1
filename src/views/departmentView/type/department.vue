<template>
  <div>
    <a-table
      :dataSource="dataTree"
      :columns="columns"
      bordered
      style="margin-bottom: 8px"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'operation'">
          <span class="cursor-pointer text-blue-400" @click="openDetail(record)"
            >查看明细</span
          >
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="detailDeptVisible"
      title="部门视图-明细"
      @ok="detailDeptOk"
      destroyOnClose
      style="width: 1000px"
    >
      <div class="flex justify-between">
        <div>责任部门：{{ selectRow.responsibleDepartmentName }}</div>
        <div>进展：{{ selectRow.evolve }}%</div>
      </div>
      <detailTable type="department" :selectRow="selectRow" />
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import { getProjectTreeApi } from "@/api/taskManage.js";
import { getTaskByDepartmentIdApi } from "@/api/departmentView.js";
import detailTable from "../components/detailTable.vue";

const props = defineProps(["selectRow"]);

const selectRow = ref({});

const dataTree = ref([]);

const detailDeptVisible = ref(false);

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
    dataIndex: "responsibleDepartmentName",
    key: "responsibleDepartmentName",
  },
  {
    title: "总任务数",
    align: "center",
    dataIndex: "total",
    sorter: (a, b) => parseInt(a.total) - parseInt(b.total),
    key: "total",
  },
  {
    title: "待办任务数",
    dataIndex: "todo",
    align: "center",
    key: "todo",
  },
  {
    title: "待审核任务数",
    align: "center",
    dataIndex: "audit",
    key: "audit",
  },
  {
    title: "已完成任务数",
    align: "center",
    dataIndex: "completed",
    key: "completed",
  },
  {
    title: "进展",
    align: "center",
    dataIndex: "evolve",
    key: "evolve",
    customRender: ({ text, record, index }) => {
      return text + "%";
    },
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "operation",
    key: "operation",
  },
]);

onMounted(async () => {
  await getProjectTree();
});

const getProjectTree = () => {
  return getProjectTreeApi({
    projectCode: props.selectRow.projectCode,
    type: "department",
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

const openDetail = (item) => {
  selectRow.value = { ...item, ...props.selectRow };
  detailDeptVisible.value = true;
};

const detailDeptOk = () => {};
</script>

<style></style>
