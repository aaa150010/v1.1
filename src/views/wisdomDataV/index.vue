<template>
  <div class="workbenchContainer">
    <div class="flex h-full">
      <div class="w-48 h-full">
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
                类型：<a-tag color="orange">{{
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
              <a-button @click="launchFullScreen(dataV)">全屏显示</a-button>
            </div>
          </div>
          <div v-if="projectList.length > 0" class="w-full h-residue4 p-2">
            <!-- {{ activeKey }} -->
            <div class="h-full overflow-y-auto">
              <iframe
                ref="dataV"
                :src="
                  '#/wisdomDataV_dataV1_index1?taskName=' +
                  projectList[activeKey].projectName +
                  '&projectCode=' +
                  projectList[activeKey].projectCode
                "
                class="w-full h-full"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { useStore } from "vuex";
import dayjs, { Dayjs } from "dayjs";
import {
  addProjectApi,
  getProjectModelApi,
  getProjectApi,
  updateProjectApi,
  addFilterConditionsApi,
} from "@/api/taskManage.js";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import dataV1 from "./dataV1/index1.vue";
import { involvedClickApi } from "@/api/departmentView.js";

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

const dataV = ref(null);

const store = useStore();
const activeKey = ref(-1);
const orderBy = ref("DESC");

const projectList = ref([]);

const selectRowProject = (index) => {
  activeKey.value = index;
};
onMounted(async () => {
  await getProjectList();
});

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
      showOne.value = res.data.showOne == "false" ? false : true;
    }
  });
};

const launchFullScreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
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
          message.success("关注成功！");
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
  height: calc(100% - 1rem);
}
.h-residue2 {
  height: calc(100% - 1.5rem);
}
.h-residue3 {
  height: calc(100% - 1rem);
}
.h-residue4 {
  height: calc(100% - 3rem);
}
</style>
