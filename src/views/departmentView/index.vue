<template>
  <div class="workbenchContainer">
    <div class="flex h-full">
      <div class="w-48 h-full">
        <div class="border h-residue1 p-2">
          <div class="h-8">
            <a-button size="small" class="float-right ml-2">
              <template #icon>
                <SortAscendingOutlined />
              </template>
            </a-button>
            <a-button size="small" class="float-right ml-2">
              <template #icon>
                <FilterOutlined />
              </template>
            </a-button>
          </div>
          <div class="overflow-y-auto h-residue2">
            <div
              v-for="(item, index) in projectList"
              class="h-24 border mt-2 p-2 cursor-pointer hover:bg-cyan-300"
              :class="index == activeKey ? 'bg-cyan-300' : ''"
              @click="selectRowProject(index)"
              :key="item.projectCode"
            >
              <div>{{ item.projectYear + item.projectName }}</div>
              <div>
                {{
                  dayjs(item.startTime).format("YYYY-MM-DD") +
                  "~" +
                  dayjs(item.endTime).format("YYYY-MM-DD")
                }}
              </div>
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
              <span>{{
                projectList[activeKey].projectYear +
                projectList[activeKey].projectName
              }}</span>
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
                :type="selectKey == 0 ? 'primary' : ''"
                @click="selectKey = 0"
                >部门视图</a-button
              >
              <a-button
                :type="selectKey == 1 ? 'primary' : ''"
                class="ml-2"
                @click="selectKey = 1"
                >指标视图</a-button
              >
              <a-button
                :type="selectKey == 2 ? 'primary' : ''"
                class="ml-2"
                @click="selectKey = 2"
                >看板视图</a-button
              >
              <a-button
                :type="selectKey == 3 ? 'primary' : ''"
                class="ml-2"
                @click="selectKey = 3"
                >思维导图</a-button
              >
            </div>
          </div>
          <div v-if="projectList.length > 0" class="w-full h-residue4 p-2">
            <div v-if="selectKey == 0" class="h-full">
              <department :selectRow="projectList[activeKey]" />
            </div>
            <div v-else-if="selectKey == 1" class="h-full">
              <index :selectRow="projectList[activeKey]" />
            </div>
            <div v-else-if="selectKey == 2" class="h-full">
              <board :selectRow="projectList[activeKey]" />
            </div>
            <div v-else-if="selectKey == 3" class="h-full">
              <mind :selectRow="projectList[activeKey]" />
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
import { getProjectApi } from "@/api/taskManage.js";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import mind from "./type/mind.vue";
import board from "./type/board.vue";
import index from "./type/index.vue";
import department from "./type/department.vue";

const store = useStore();
const activeKey = ref(-1);
const selectKey = ref(0);
const orderBy = ref("DESC");

const projectList = ref([]);

const selectRowProject = (index) => {
  activeKey.value = index;
};
onMounted(async () => {
  await getProjectList();
});

const getProjectList = () => {
  return getProjectApi({ order: orderBy.value }).then((res) => {
    if (res.result == "ok") {
      if (activeKey.value == -1 && res.data.length > 0) {
        activeKey.value = 0;
      }
      projectList.value = res.data;
    }
  });
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
