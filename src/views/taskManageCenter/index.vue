<template>
  <div class="workbenchContainer">
    <div class="flex h-full">
      <div class="w-48 py-2 h-full">
        <div class="center px-2 mb-2">
          <a-button type="primary" @click="openAddProject">新建项目</a-button>
        </div>
        <div class="border h-residue1 p-2">
          <div class="h-8">
            <a-button
              size="small"
              class="float-right ml-2"
              @click="
                () => {
                  if (orderBy == 'DESC') {
                    orderBy = 'ASC';
                  } else {
                    orderBy = 'DESC';
                  }
                  getProjectList();
                }
              "
            >
              <template #icon>
                <SortAscendingOutlined />
              </template>
            </a-button>
            <a-button
              size="small"
              class="float-right ml-2"
              @click="
                () => {
                  filterVisible = true;
                }
              "
            >
              <template #icon>
                <FilterOutlined />
              </template>
            </a-button>
          </div>
          <div class="overflow-y-auto h-residue2">
            <div
              v-for="(item, index) in projectList"
              class="h-26 border mt-2 p-2 cursor-pointer hover:bg-blue-200 rounded-md"
              :class="index == activeKey ? 'bg-blue-200' : ''"
              @click="selectRowProject(index)"
              :key="item.projectCode"
            >
              <div class="flex justify-between">
                <span>{{ item.projectName }}</span>
                <div @click="involvedClick(item)">
                  <StarFilled v-if="item.involved" />
                  <StarOutlined v-else />
                </div>
              </div>
              <div>
                {{
                  dayjs(item.startTime).format("YYYY-MM-DD") +
                  "~" +
                  dayjs(item.endTime).format("YYYY-MM-DD")
                }}
              </div>
              <a-divider class="my-1" />
              <div class="flex justify-around items-center">
                <span>{{ item.schedule }}%</span>
                <a-progress
                  :percent="item.schedule"
                  :size="8"
                  strokeLinecap="square"
                  class="w-20"
                  :show-info="false"
                />
                <span>>></span>
              </div>
              <div>
                类型：<a-tag :color="item.color">{{
                  item.projectType ? item.projectType : "其他"
                }}</a-tag>
              </div>
            </div>
            <div v-if="projectList.length == 0">暂无项目</div>
          </div>
        </div>
      </div>
      <div class="w-residue1" style="padding-left: 5px; padding-right: 5px">
        <div class="border h-residue3">
          <projectModel
            :projectModelList="projectModelList"
            :openAddProject="openAddProject"
          />
          <div
            v-if="projectList.length > 0"
            class="flex justify-between items-center p-2 border-b"
          >
            <div>
              <span>{{ projectList[activeKey].projectName }}</span>
              <a-tag
                v-if="projectList[activeKey].listed"
                class="ml-2"
                color="green"
                >已上架</a-tag
              >
              <a-tag v-else class="ml-2" color="red">已下架</a-tag>
              <a-tag v-if="projectList[activeKey].feedback" color="blue"
                >执行中</a-tag
              >
              <a-tag v-else class="ml-2" color="red">停止反馈</a-tag>
              <span>{{
                projectList[activeKey].startTime +
                "~" +
                projectList[activeKey].endTime
              }}</span>
            </div>
            <div>
              <a-button
                class=""
                v-if="projectList[activeKey].feedbackPermission"
                @click="updateFeedback"
                >{{
                  projectList[activeKey].feedback ? "关闭反馈" : "开启反馈"
                }}</a-button
              >
              <a-button
                class="ml-2"
                @click="updateListed"
                v-if="projectList[activeKey].listedPermission"
                >{{
                  projectList[activeKey].listed ? "项目下架" : "项目上架"
                }}</a-button
              >
            </div>
          </div>
          <div v-if="projectList.length > 0" class="w-full h-residue4 p-2">
            <mind
              :selectRow="projectList[activeKey]"
              :getProjectList="getProjectList"
              :getProjectListBack="getProjectListBack"
              :showOne="showOne"
            ></mind>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      v-model:open="addVisible"
      ok-text="确认"
      cancel-text="取消"
      @ok="addProject"
    >
      <template #title>
        <div>新建项目</div>
      </template>
      <a-form
        ref="formProjectRef"
        :model="formProject"
        :rules="formProjectRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="项目隶属年份" name="projectYear">
          <a-select
            v-model:value="formProject.projectYear"
            placeholder="请选择年份"
          >
            <a-select-option
              v-for="item in yearList"
              :key="item"
              :value="item"
              >{{ item }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="项目名称" name="projectName">
          <a-input v-model:value="formProject.projectName" />
        </a-form-item>
        <a-form-item label="项目开始时间" name="startTime">
          <a-date-picker
            v-model:value="formProject.startTime"
            format="YYYY-MM-DD HH:mm:ss"
            :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
          />
        </a-form-item>
        <a-form-item label="项目截止时间" name="endTime">
          <a-date-picker
            v-model:value="formProject.endTime"
            format="YYYY-MM-DD HH:mm:ss"
            :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
          />
        </a-form-item>
        <a-form-item label="项目模板" name="templateCode">
          <a-select
            v-model:value="formProject.templateCode"
            allowClear
            placeholder="暂无模板"
          >
            <a-select-option
              v-for="item in projectModelAllList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="项目类型" name="projectType">
          <a-select
            v-model:value="formProject.projectType"
            allowClear
            placeholder="选择类型"
          >
            <a-select-option
              v-for="item in projectTypeList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="" name="listed">
          <div class="flex justify-center">
            <span class="w-24">是否直接发布:（项目上架）</span>
            <a-radio-group
              class="inline-block"
              v-model:value="formProject.listed"
            >
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </div>
        </a-form-item>
        <a-form-item label="" name="feedback">
          <div class="flex justify-center">
            <span class="w-24">是否开启反馈:</span>
            <a-radio-group v-model:value="formProject.feedback">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:open="filterVisible" :footer="null">
      <template #title>
        <div>过滤条件</div>
      </template>
      <a-checkbox-group
        v-model:value="filterObj.checks"
        :options="filterOption"
        class="mb-4"
      />
      <a-form>
        <div v-for="item in filterObj.checks" :key="item">
          <a-form-item
            v-if="item == 'PROJECT_NAME'"
            label="项目名称"
            name="PROJECT_NAME"
          >
            <a-input v-model:value="filterObj.form.PROJECT_NAME.value" />
          </a-form-item>
          <a-form-item
            v-else-if="item == 'PROJECT_YEAR'"
            label="项目年份"
            name="PROJECT_YEAR"
          >
            <a-select
              v-model:value="filterObj.form.PROJECT_YEAR.value"
              placeholder="请选择年份"
            >
              <a-select-option
                v-for="item in yearList"
                :key="item"
                :value="item"
                >{{ item }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item
            v-else-if="item == 'PROJECT_TYPE'"
            label="项目类型"
            name="PROJECT_TYPE"
          >
            <a-checkbox-group
              v-model:value="filterObj.form.PROJECT_TYPE.value"
              :options="projectTypeList"
            />
            <!-- <a-select
              v-model:value="filterObj.form.PROJECT_TYPE.value"
              placeholder="请选择类型"
            >
              <a-select-option
                v-for="item in projectTypeList"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</a-select-option
              >
            </a-select> -->
          </a-form-item>
        </div>
      </a-form>
      <div>
        <div class="float-right">
          <a-button @click="filterVisible = false">取消</a-button>
          <a-button type="primary" class="ml-2" @click="addFilterConditions"
            >保存筛选</a-button
          >
          <a-button type="primary" class="ml-2" @click="filterSureClick"
            >筛选</a-button
          >
        </div>
        <div class="clear-right"></div>
      </div>
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, ref, nextTick } from "vue";
import {
  SortAscendingOutlined,
  FilterOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons-vue";
import mind from "./mind.vue";

import projectModel from "./components/projectModel.vue";
import { useStore } from "vuex";
import dayjs, { Dayjs } from "dayjs";
import {
  addProjectApi,
  getProjectModelApi,
  getProjectApi,
  updateProjectApi,
  getSelectDataApi,
  getProjectTypeListApi,
  addFilterConditionsApi,
} from "@/api/taskManage.js";
import { involvedClickApi } from "@/api/departmentView.js";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { async } from "@antv/x6/lib/registry/marker/async";

const filterVisible = ref(false);

const showOne = ref(false);

const filterOption = ref([
  { value: "PROJECT_NAME", label: "项目名称" },
  { value: "PROJECT_YEAR", label: "项目年份" },
  // { value: "PROJECT_TYPE", label: "项目类型" },
]);

const filterObj = ref({
  checks: [],
  form: {
    PROJECT_NAME: { value: "", condition: "like" },
    PROJECT_YEAR: { value: "", condition: "like" },
    PROJECT_TYPE: { value: "", condition: "like" },
  },
});

const filterSureClick = async () => {
  await getProjectList(filterObj.value);
  filterVisible.value = false;
  message.success("筛选成功！");
};

const filtersCheckList = (filterObjV) => {
  let filterObjVar = null;
  if (filterObjV.checks.length > 0) {
    filterObjVar = {};
    let objVar = {};
    filterObjV.checks.forEach((item) => {
      objVar[item] = filterObjV.form[item];
    });
    filterObjVar.checks = filterObjV.checks;
    filterObjVar.form = objVar;
  }
  return filterObjVar;
};

const addFilterConditions = () => {
  Modal.confirm({
    title: "提示",
    icon: createVNode(ExclamationCircleOutlined),
    content: "确定要长期保存过滤条件吗？",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      return addFilterConditionsApi(filtersCheckList(filterObj.value)).then(
        (res) => {
          if (res.result == "ok") {
            message.success("保存成功！");
            filterVisible.value = false;
            getProjectList();
          }
        }
      );
    },
  });
};

const store = useStore();
const activeKey = ref(-1);
const orderBy = ref("DESC");

const projectList = ref([]);
const projectTypeList = ref([
  { value: "教学", label: "教学" },
  { value: "事务", label: "事务" },
  { value: "生活", label: "生活" },
  { value: "其他", label: "其他" },
]);
const projectModelList = ref([]);
const projectModelAllList = ref([]);

const selectRowProject = (index) => {
  activeKey.value = index;
};

const yearList = ref([
  dayjs().format("YYYY") - 5,
  dayjs().format("YYYY") - 4,
  dayjs().format("YYYY") - 3,
  dayjs().format("YYYY") - 2,
  dayjs().format("YYYY") - 1,
  dayjs().format("YYYY"),
  parseInt(dayjs().format("YYYY")) + 1,
  parseInt(dayjs().format("YYYY")) + 2,
  parseInt(dayjs().format("YYYY")) + 3,
  parseInt(dayjs().format("YYYY")) + 4,
  parseInt(dayjs().format("YYYY")) + 5,
]);

onMounted(async () => {
  await getProjectModelList();
  await getProjectTypeList();
  await getProjectModelAllList();
  await getProjectList();
});

const addVisible = ref(false);
const formProjectRef = ref(null);
const formProject = ref({
  projectYear: dayjs().format("YYYY"),
  projectName: "",
  startTime: "",
  endTime: "",
  templateCode: "",
  listed: false,
  feedback: false,
  projectType: "",
});

const formProjectRules = {
  projectYear: [{ required: true, message: "请选择项目年份", trigger: "blur" }],
  projectName: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
  startTime: [
    { required: true, message: "请选择项目开始时间", trigger: "blur" },
  ],
  endTime: [{ required: true, message: "请选择项目截止时间", trigger: "blur" }],
  templateCode: [],
  listed: [],
  feedback: [],
};

const labelCol = { span: 6 };
const wrapperCol = { span: 13 };

const openAddProject = (modelValue) => {
  if (modelValue && typeof modelValue == "string") {
    formProject.value.templateCode = modelValue;
  }
  addVisible.value = true;
};

const addProject = () => {
  formProjectRef.value.validate().then(() => {
    addProjectApi(formProject.value).then((res) => {
      if (res.result == "ok") {
        message.success("新建成功！");
        addVisible.value = false;
        formProjectRef.value.resetFields();
        getProjectList();
      }
    });
  });
};

const getProjectModelList = () => {
  return getProjectModelApi().then((res) => {
    if (res.result == "ok") {
      projectModelList.value = res.data.templateData;
    }
  });
};

const getProjectTypeList = () => {
  return getSelectDataApi({ type: "projectType" }).then((res) => {
    if (res.result == "ok") {
      projectTypeList.value = res.data;
    }
  });
};

const getProjectModelAllList = () => {
  return getSelectDataApi({ type: "template" }).then((res) => {
    if (res.result == "ok") {
      projectModelAllList.value = res.data;
    }
  });
};

const getProjectList = () => {
  return getProjectApi({
    order: orderBy.value,
    flag: true,
    conditions: filtersCheckList(filterObj.value),
  }).then((res) => {
    if (res.result == "ok") {
      if (activeKey.value == -1 && res.data.projectData.length > 0) {
        activeKey.value = 0;
      }
      projectList.value = res.data.projectData;
      if (res.data.condition) {
        let { checks, form } = JSON.parse(res.data.condition);
        filterObj.value.checks = checks;
        filterObj.value.form = { ...filterObj.value.form, ...form };
      }
      showOne.value = res.data.showOne + "" == "false" ? false : true;
    }
  });
};

const getProjectListBack = () => {
  return getProjectApi({
    order: orderBy.value,
    flag: true,
    conditions: filtersCheckList(filterObj.value),
  }).then((res) => {
    if (res.result == "ok") {
      activeKey.value = 0;
      projectList.value = res.data.projectData;
      if (res.data.condition) {
        let { checks, form } = JSON.parse(res.data.condition);
        filterObj.value.checks = checks;
        filterObj.value.form = { ...filterObj.value.form, ...form };
      }
      showOne.value = res.data.showOne == "false" ? false : true;
    }
  });
};

// 修改反馈
const updateFeedback = () => {
  if (projectList.value[activeKey.value].feedback) {
    Modal.confirm({
      title:
        "关闭反馈后，项目相关人员无法进行业务办理，仅能查看相关信息。请确认，是否关闭反馈...",
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        updateProjectApi({
          ...projectList.value[activeKey.value],
          feedback: !projectList.value[activeKey.value].feedback,
        }).then((res) => {
          if (res.result == "ok") {
            message.success("修改成功");
            getProjectList();
          }
        });
      },
      onCancel() {},
    });
  } else {
    updateProjectApi({
      ...projectList.value[activeKey.value],
      feedback: !projectList.value[activeKey.value].feedback,
    }).then((res) => {
      if (res.result == "ok") {
        message.success("修改成功");
        getProjectList();
      }
    });
  }
};
// 修改上架
const updateListed = () => {
  if (projectList.value[activeKey.value].listed) {
    Modal.confirm({
      title:
        "项目下架后，用户将无法查看该项目信息，包括工作台数据概览统计、待办事项、任务栈数据信息等。请确认，是否项目下架...",
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        updateProjectApi({
          ...projectList.value[activeKey.value],
          listed: !projectList.value[activeKey.value].listed,
        }).then((res) => {
          if (res.result == "ok") {
            message.success("修改成功");
            getProjectList();
          }
        });
      },
      onCancel() {},
    });
  } else {
    updateProjectApi({
      ...projectList.value[activeKey.value],
      listed: !projectList.value[activeKey.value].listed,
    }).then((res) => {
      if (res.result == "ok") {
        message.success("修改成功");
        getProjectList();
      }
    });
  }
};

const involvedClick = (item) => {
  return involvedClickApi({ projectCode: item.projectCode }).then(
    async (res) => {
      if (res.result == "ok") {
        await getProjectList();
        if (item.involved) {
          message.success("取消关注成功！");
        } else {
          message.success("已关注成功！");
        }
      }
    }
  );
};
</script>
<style scoped>
.workbenchContainer {
  width: 100%;
  height: 100%;
}
.w-residue1 {
  width: calc(100% - 12rem);
}
.h-residue1 {
  height: calc(100% - 3rem);
}
.h-residue2 {
  height: calc(100% - 1.5rem);
}
.h-residue3 {
  height: calc(100% - 1rem);
}
.h-residue4 {
  height: calc(100% - 8rem);
}
</style>
