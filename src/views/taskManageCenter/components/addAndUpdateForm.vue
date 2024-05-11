<template>
  <a-form ref="formNodeRef" :model="formNode" :rules="rulesNode">
    <a-row :gutter="24" v-if="type == 'add'">
      <a-col :span="12">
        <a-form-item label="上级任务名称：">{{ selectRow.name }} </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="上级任务负责部门：">
          <a-tree-select
            v-model:value="selectRow.responsibleDepartment"
            placeholder="请选择部门"
            show-search
            disabled
            :tree-data="deptListTree"
            allowClear
          >
          </a-tree-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="上级任务负责人：">
          <a-tree-select
            v-model:value="selectRow.personResponsible"
            placeholder="请选择责任人"
            show-search
            disabled
            :tree-data="peopleListTree"
            allowClear
          >
          </a-tree-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="上级任务截止时间：">
          {{ selectRow.endTime }}
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="任务说明："
          >{{ selectRow.taskDescription }}
        </a-form-item>
      </a-col>
    </a-row>

    <a-divider v-if="type == 'add'" />
    <a-row :gutter="24">
      <a-col :span="24">
        <a-form-item label="子任务名称" name="taskName">
          <a-input v-model:value="formNode.taskName" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="负责部门" name="responsibleDepartment">
          <a-tree-select
            v-model:value="formNode.responsibleDepartment"
            placeholder="请选择部门"
            show-search
            :tree-data="deptListTree"
            allowClear
          >
          </a-tree-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="责任人" name="personResponsible">
          <a-tree-select
            v-model:value="formNode.personResponsible"
            placeholder="请选择责任人"
            show-search
            :tree-data="peopleListTree"
            allowClear
          >
          </a-tree-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="任务开始时间" name="startTime">
          <a-date-picker
            v-model:value="formNode.startTime"
            format="YYYY-MM-DD"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="任务截止时间" name="endTime">
          <a-date-picker v-model:value="formNode.endTime" format="YYYY-MM-DD" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="任务说明"
          name="taskDescription"
          style="width: 550px"
        >
          <a-textarea v-model:value="formNode.taskDescription" />
        </a-form-item>
      </a-col>
    </a-row>
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
import { onMounted, reactive, ref, defineProps, computed } from "vue";
import { useStore } from "vuex";
import {
  getSelectDataApi,
  addNodeApi,
  updateNodeApi,
} from "@/api/taskManage.js";
import dayjs, { Dayjs } from "dayjs";
import { message } from "ant-design-vue";
const store = useStore();

const props = defineProps(["getProjectTree"]);

const type = computed(() => store.state.nodeConfig.type);
const selectRow = computed(() => store.state.nodeConfig.selectRow);

console.log(store.state.nodeConfig.selectRow);
const formNodeRef = ref();
const labelCol = { span: 6 };
const wrapperCol = { span: 13 };

const deptListTree = ref([]);
const peopleListTree = ref([]);

const formNode = reactive({
  id:
    store.state.nodeConfig.type == "update"
      ? store.state.nodeConfig.selectRow.id
      : "",
  projectCode: store.state.nodeConfig.selectRow.projectCode,
  parentTaskCode: store.state.nodeConfig.selectRow.id,
  taskName:
    store.state.nodeConfig.type == "update"
      ? store.state.nodeConfig.selectRow.name
      : "",
  responsibleDepartment:
    store.state.nodeConfig.type == "update"
      ? store.state.nodeConfig.selectRow.responsibleDepartment
      : "",
  personResponsible:
    store.state.nodeConfig.type == "update"
      ? store.state.nodeConfig.selectRow.personResponsible
      : "",
  startTime:
    store.state.nodeConfig.type == "update"
      ? dayjs(store.state.nodeConfig.selectRow.startTime)
      : "",
  endTime:
    store.state.nodeConfig.type == "update"
      ? dayjs(store.state.nodeConfig.selectRow.endTime)
      : "",
  taskType: 1,
  taskDescription:
    store.state.nodeConfig.type == "update"
      ? store.state.nodeConfig.selectRow.taskDescription
      : "",
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

const getPeopleListTree = () => {
  return getSelectDataApi({
    type: "person",
  }).then((res) => {
    if (res.result == "ok") {
      peopleListTree.value = res.data.map((item) => {
        item.selectable = false;
        return item;
      });
    }
  });
};

onMounted(async () => {
  await getDeptListTree();
  await getPeopleListTree();
});

const handleOk = () => {
  formNodeRef.value.validate().then(async () => {
    console.log(formNode);
    if (store.state.nodeConfig.type == "add") {
      await addNode();
    } else {
      await updateNode();
    }
  });
};

const addNode = () => {
  return addNodeApi(formNode).then((res) => {
    if (res.result == "ok") {
      message.success("新增成功！");
      props.getProjectTree();
      store.commit("setNodeConfig", { visible: false });
    }
  });
};

const updateNode = () => {
  return updateNodeApi(formNode).then((res) => {
    if (res.result == "ok") {
      message.success("修改成功！");
      props.getProjectTree();
      store.commit("setNodeConfig", { visible: false });
    }
  });
};

const handleCancel = () => {
  store.commit("setNodeConfig", { visible: false });
};
</script>
