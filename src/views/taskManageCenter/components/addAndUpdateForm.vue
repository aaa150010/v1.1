<template>
  <div class="pb-16">
    <div class="px-4" style="height: 600px; overflow-y: scroll">
      <a-form ref="formNodeRef" :model="formNode" :rules="rulesNode">
        <a-row :gutter="24" v-if="type == 'add'">
          <a-col :span="12">
            <a-form-item label="上级任务名称："
              >{{ selectRow.name }}
            </a-form-item>
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
          <a-col :span="24">
            <a-form-item label="任务说明："
              >{{ selectRow.taskDescription }}
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider v-if="type == 'add'" class="my-2" />
        <a-form-item label="任务类型" name="taskType">
          <a-radio-group
            :disabled="type == 'seeDetail'"
            v-model:value="formNode.taskType"
            button-style="solid"
          >
            <a-radio-button
              v-for="item in taskTypeList"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</a-radio-button
            >
          </a-radio-group>
        </a-form-item>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="子任务名称" name="taskName">
              <a-input
                v-model:value="formNode.taskName"
                :disabled="type == 'seeDetail'"
                placeholder="请输入子任务名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="负责部门" name="responsibleDepartment">
              <a-tree-select
                v-model:value="formNode.responsibleDepartment"
                placeholder="请选择部门"
                :disabled="type == 'seeDetail'"
                treeNodeFilterProp="label"
                @change="responsibleDepartmentChange"
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
                :disabled="type == 'seeDetail'"
                show-search
                treeNodeFilterProp="label"
                :tree-data="peopleListTree"
                :treeDefaultExpandedKeys="treeExpandedKeys"
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
                :disabled="type == 'seeDetail'"
                style="width: 100%"
                placeholder="请选择任务开始时间"
                :disabledDate="
                  (currentDate) => {
                    if (selectRow.origin) {
                      return false;
                    }
                    return disabledDate(
                      currentDate,
                      selectRow.startTime,
                      selectRow.endTime
                    );
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="任务截止时间" name="endTime">
              <a-date-picker
                v-model:value="formNode.endTime"
                format="YYYY-MM-DD"
                :disabled="type == 'seeDetail'"
                style="width: 100%"
                placeholder="请选择任务结束时间"
                :disabledDate="
                  (currentDate) => {
                    return disabledDate(
                      currentDate,
                      formNode.startTime,
                      selectRow.endTime
                    );
                  }
                "
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考核方式" name="assessmentMethod"
              ><a-select
                v-model:value="formNode.assessmentMethod"
                show-search
                :disabled="type == 'seeDetail'"
                style="width: 100%"
                :options="assessmentMethodOption"
              ></a-select
            ></a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item label="任务分数" name="taskScore">
              <a-row>
                <a-col :span="12">
                  <a-slider
                    v-model:value="formNode.taskScore"
                    :disabled="type == 'seeDetail'"
                    :min="0"
                    :max="
                      type == 'add' ? selectRow.maxScore : selectRow.updateScore
                    "
                    :step="0.1"
                    placeholder="请填写任务分数"
                    style="width: 100%"
                  />
                </a-col>
                <a-col :span="4">
                  <a-input-number
                    v-model:value="formNode.taskScore"
                    :min="0"
                    :disabled="type == 'seeDetail'"
                    :max="
                      type == 'add' ? selectRow.maxScore : selectRow.updateScore
                    "
                    :step="0.1"
                    style="width: 100%; margin-left: 16px"
                /></a-col>
                <div class="ml-8 h-8 center">
                  最高分：{{
                    type == "add" ? selectRow.maxScore : selectRow.updateScore
                  }}
                </div>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="formNode.taskType == '分发任务'">
            <a-form-item
              label="任务说明"
              name="taskDescription"
              placeholder="请填写任务说明"
            >
              <a-textarea
                style="width: 100%"
                :disabled="type == 'seeDetail'"
                v-model:value="formNode.taskDescription"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="formNode.taskType == '指标任务'">
            <a-form-item
              label="量化指标说明"
              name="targetDescription"
              placeholder="请填写量化指标说明"
            >
              <a-textarea
                style="width: 100%"
                :disabled="type == 'seeDetail'"
                v-model:value="formNode.targetDescription"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="formNode.taskType == '指标任务'">
            <a-form-item
              label="量化指标名称"
              name="targetName"
              placeholder="请填写量化指标名称"
            >
              <a-input
                style="width: 100%"
                :disabled="type == 'seeDetail'"
                v-model:value="formNode.targetName"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="formNode.taskType == '指标任务'">
            <a-form-item
              label="量化指标类型"
              name="targetType"
              placeholder="请填写量化指标类型"
            >
              <a-radio-group
                v-model:value="formNode.targetType"
                button-style="solid"
                :disabled="type == 'seeDetail'"
                @change="formNode.targetValue = null"
              >
                <a-radio-button
                  v-for="item in targetTypeList"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</a-radio-button
                >
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="formNode.taskType == '指标任务'">
            <a-form-item
              label="量化指标数值"
              name="targetValue1"
              placeholder="请填写量化指标数值"
              v-if="formNode.targetType == '数字'"
            >
              <a-row>
                <a-col :span="12">
                  <a-slider
                    v-model:value="formNode.targetValue1"
                    :disabled="type == 'seeDetail'"
                    :step="0.1"
                    placeholder="请填写任务分数"
                    style="width: 100%"
                  />
                </a-col>
                <a-col :span="4">
                  <a-input-number
                    v-model:value="formNode.targetValue1"
                    :disabled="type == 'seeDetail'"
                    style="width: 100%; margin-left: 16px"
                /></a-col>
              </a-row>
            </a-form-item>
            <a-form-item
              label="量化指标数值"
              name="targetValue2"
              v-else-if="formNode.targetType == '字母'"
            >
              <a-input
                style="width: 100%"
                :disabled="type == 'seeDetail'"
                placeholder="请填写量化指标数值A-Z"
                v-model:value="formNode.targetValue2"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" v-if="type != 'add'">
            <a-form-item label="排序" name="sort" placeholder="排序">
              <a-input-number
                style="width: 100%"
                :disabled="type == 'seeDetail'"
                v-model:value="formNode.sort"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="absolute bottom-4 right-4 bg-white" v-if="type != 'seeDetail'">
      <a-button @click="handleCancel">取消</a-button>
      <a-button @click="handleOk" type="primary" class="ml-2">确定</a-button>
    </div>
  </div>
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
import { removeTo } from "@/api/myspace";
const store = useStore();

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

const props = defineProps([
  "getProjectTree",
  "deptListTree",
  "peopleListTree",
  "getProjectList",
  "getProjectTreeKeepCollapse",
]);
const treeExpandedKeys = ref([]);

const type = computed(() => store.state.nodeConfig.type);
const selectRow = computed(() => store.state.nodeConfig.selectRow);

// console.log(store.state.nodeConfig.selectRow);
const formNodeRef = ref();
const labelCol = { span: 6 };
const wrapperCol = { span: 13 };

const assessmentMethodOption = ref([{ label: "审核评分", value: "审核评分" }]);
const targetTypeList = ref([
  { label: "数字", value: "数字" },
  { label: "字母", value: "字母" },
]);

const formNode = reactive({
  id:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.id
      : null,
  projectCode: store.state.nodeConfig.selectRow.projectCode,
  parentTaskCode: store.state.nodeConfig.selectRow.id,
  taskName:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.name
      : null,
  responsibleDepartment:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.responsibleDepartment
      : userInfo.departmentId,
  personResponsible:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.personResponsible
      : userInfo.userId,
  startTime: dayjs(store.state.nodeConfig.selectRow.startTime),
  endTime: dayjs(store.state.nodeConfig.selectRow.endTime),
  taskType:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.taskType
      : "分发任务",
  assessmentMethod:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.assessmentMethod
      : "审核评分",
  targetType: store.state.nodeConfig.selectRow.targetType
    ? store.state.nodeConfig.selectRow.targetType
    : "数字",
  taskDescription:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.taskDescription
      : null,
  taskScore:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.taskScore
      : null,
  sort:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.sort
      : null,
  targetName:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.targetName
      : null,
  targetDescription:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.targetDescription
      : null,
  targetValue:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.targetValue
      : null,
  targetValue1:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.targetValue
      : null,
  targetValue2:
    store.state.nodeConfig.type != "add"
      ? store.state.nodeConfig.selectRow.targetValue
      : null,
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
  taskScore: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  assessmentMethod: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  taskType: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  targetName: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  targetDescription: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  targetType: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  targetValue1: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  targetValue2: [
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
    {
      pattern: /^[A-Z]+$/,
      message: "格式不对",
      trigger: "blur",
    },
  ],
};

const taskTypeList = ref([
  { value: "分发任务", label: "分发任务" },
  { value: "指标任务", label: "指标任务" },
]);

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
  if (formNode.targetType == "数字") {
    formNode.targetValue = formNode.targetValue1;
  } else if (formNode.targetType == "字母") {
    formNode.targetValue = formNode.targetValue2;
  }
  return addNodeApi(formNode).then((res) => {
    if (res.result == "ok") {
      message.success("新增成功！");
      props.getProjectTreeKeepCollapse();
      store.commit("setNodeConfig", { visible: false });
    }
  });
};

const updateNode = () => {
  if (formNode.targetType == "数字") {
    formNode.targetValue = formNode.targetValue1;
  } else if (formNode.targetType == "字母") {
    formNode.targetValue = formNode.targetValue2;
  }
  return updateNodeApi(formNode).then((res) => {
    if (res.result == "ok") {
      message.success("修改成功！");
      props.getProjectTreeKeepCollapse();
      store.commit("setNodeConfig", { visible: false });
      if (selectRow.value.origin) {
        props.getProjectList();
      }
    }
  });
};

const handleCancel = () => {
  store.commit("setNodeConfig", { visible: false });
};

const responsibleDepartmentChange = (valueVar) => {
  treeExpandedKeys.value = [valueVar];
};
const disabledDate = (currentDate, startTime, endTime) => {
  if (
    dayjs(startTime).valueOf() <= dayjs(currentDate).valueOf() &&
    dayjs(currentDate).valueOf() <= dayjs(endTime).valueOf()
  ) {
    return false;
  }
  return true;
};
</script>
