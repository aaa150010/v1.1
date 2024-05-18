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
                  orderBy = 'ASC';
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
                  orderBy = 'DESC';
                  getProjectList();
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
              class="h-26 border mt-2 p-2 cursor-pointer hover:bg-cyan-300"
              :class="index == activeKey ? 'bg-cyan-300' : ''"
              @click="selectRowProject(index)"
              :key="item.projectCode"
            >
              <div>{{ item.projectName }}</div>
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
  </div>
</template>
<script setup>
import { onMounted, ref, nextTick } from "vue";
import { SortAscendingOutlined, FilterOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import dayjs, { Dayjs } from "dayjs";
import {
  addProjectApi,
  getProjectModelApi,
  getProjectApi,
  updateProjectApi,
} from "@/api/taskManage.js";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import dataV1 from "./dataV1/index1.vue";

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
  return getProjectApi({ order: orderBy.value, flag: false }).then((res) => {
    if (res.result == "ok") {
      if (activeKey.value == -1 && res.data.length > 0) {
        activeKey.value = 0;
      }
      projectList.value = res.data;
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
