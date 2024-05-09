<template>
  <a-form
    ref="formNodeRef"
    :model="formNode"
    :rules="rulesNode"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="子任务名称" name="taskName">
      <a-input v-model:value="formNode.taskName" />
    </a-form-item>
    <a-form-item label="负责部门" name="responsibleDepartment">
      <a-tree-select
        v-model:value="formNode.responsibleDepartment"
        placeholder="请选择部门"
        show-search
        :tree-data="deptListTree"
        allowClear
        @change="deptChange"
      >
      </a-tree-select>
    </a-form-item>
    <a-form-item label="责任人" name="personResponsible">
      <a-select
        v-model:value="formNode.personResponsible"
        placeholder="请选择负责人"
      >
        <a-select-option
          v-for="item in peopleList"
          :key="item.value"
          :value="item.value"
          >{{ item.label }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item label="任务开始时间" name="startTime">
      <a-date-picker
        v-model:value="formNode.startTime"
        format="YYYY-MM-DD HH:mm:ss"
        :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
      />
    </a-form-item>
    <a-form-item label="任务截止时间" name="endTime">
      <a-date-picker
        v-model:value="formNode.endTime"
        format="YYYY-MM-DD HH:mm:ss"
        :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
      />
    </a-form-item>
    <a-form-item label="任务说明" name="taskDescription">
      <a-textarea v-model:value="formNode.taskDescription" />
    </a-form-item>
    <div class="flex justify-between">
      <div></div>
      <div>
        <a-button @click="handleCancel">取消</a-button>
        <a-button @click="handleOk" type="primary" class="ml-2">确定</a-button>
      </div>
    </div>
  </a-form>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getSelectDataApi } from "@/api/taskManage.js";
import dayjs, { Dayjs } from "dayjs";
const store = useStore();

console.log(store.state.nodeConfig.selectRow);
const formNodeRef = ref();
const labelCol = { span: 6 };
const wrapperCol = { span: 13 };

const deptListTree = ref([]);
const peopleList = ref([]);

const formNode = reactive({
  projectCode: store.state.nodeConfig.selectRow.projectCode,
  parentTaskCode: store.state.nodeConfig.selectRow.id,
  taskName: "",
  responsibleDepartment: "",
  personResponsible: "",
  startTime: "",
  endTime: "",
  taskType: 1,
  taskDescription: "",
});
const rulesNode = {
  taskName: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  responsibleDepartment: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  personResponsible: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  startTime: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  endTime: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  taskDescription: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
};

const getDeptListTree = () => {
  return getSelectDataApi({ type: "department" }).then((res) => {
    if (res.result == "ok") {
      deptListTree.value = res.data;
    }
  });
};

const deptChange = () => {
  return getSelectDataApi({
    type: "person",
    departmentId: formNode.responsibleDepartment,
  }).then((res) => {
    if (res.result == "ok") {
      peopleList.value = res.data;
    }
  });
};

onMounted(async () => {
  await getDeptListTree();
});

const handleOk = () => {
  store.commit("setNodeConfig", { visible: false });
};
const handleCancel = () => {
  store.commit("setNodeConfig", { visible: false });
};
</script>
