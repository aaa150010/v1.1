<template>
  <div class="h-full">
    <a-table
      :dataSource="dataTree"
      :columns="columns"
      bordered
      style="margin-bottom: 8px"
      :pagination="false"
      :scroll="{ y: 800 }"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'operation'">
          <span
            class="cursor-pointer text-blue-400 underline"
            @click="openDetail(record)"
            >查看明细</span
          >
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="detailDeptVisible"
      title="指标视图-明细"
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

let testArr1 = [];
let testArr2 = [];
// let testArr3 = [];
let testPosition1 = 0;
let testPosition2 = 0;
// let testPosition3 = 0;

const columns = ref([
  {
    title: "一级指标",
    align: "center",
    dataIndex: "target1",
    key: "target1",
    customCell: (_, index) => {
      const _row = testArr1[index];
      const _col = _row > 0 ? 1 : 0;
      return { rowSpan: _row, colSpan: _col };
    },
  },
  {
    title: "二级指标",
    align: "center",
    dataIndex: "target2",
    key: "target2",
    customCell: (_, index) => {
      const _row = testArr2[index];
      const _col = _row > 0 ? 1 : 0;
      return { rowSpan: _row, colSpan: _col };
    },
  },
  {
    title: "三级指标",
    align: "center",
    dataIndex: "taskItem",
    key: "taskItem",
  },
  {
    title: "评分标准",
    dataIndex: "describe",
    width: 300,
    key: "describe",
  },
  {
    title: "得分",
    align: "center",
    dataIndex: "evolve",
    key: "evolve",
  },
  {
    title: "负责部门",
    align: "center",
    dataIndex: "responsibleDepartmentName",
    key: "responsibleDepartmentName",
  },
  {
    title: "审批部门",
    align: "center",
    dataIndex: "auditDepartmentName",
    key: "auditDepartmentName",
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "operation",
    key: "operation",
  },
]);

const dataTree = ref([]);
onMounted(async () => {
  await getProjectTree();
});

const getProjectTree = () => {
  testArr1 = [];
  testArr2 = [];
  testPosition1 = 0;
  testPosition2 = 0;
  return getProjectTreeApi({
    projectCode: props.selectRow.projectCode,
    type: "target",
  }).then((res) => {
    if (res.result == "ok") {
      dataTree.value = res.data;
      rowspan(testArr1, testPosition1, "target1");
      rowspan(testArr2, testPosition2, "target2");
      // rowspan(testArr3, testPosition3, "taskName");
    }
  });
};

watch(
  () => props.selectRow,
  async () => {
    await getProjectTree();
  }
);

const rowspan = (spanArr, position, spanName) => {
  dataTree.value.forEach((item, index) => {
    if (index === 0) {
      spanArr.push(1);
      position = 0;
    } else {
      if (
        dataTree.value[index][spanName] === dataTree.value[index - 1][spanName]
      ) {
        spanArr[position] += 1;
        spanArr.push(0);
      } else {
        spanArr.push(1);
        position = index;
      }
    }
  });
};

const selectRow = ref({});
const detailDeptVisible = ref(false);

const openDetail = (item) => {
  selectRow.value = { ...item, ...props.selectRow };
  detailDeptVisible.value = true;
};

const detailDeptOk = () => {};
</script>

<style></style>
