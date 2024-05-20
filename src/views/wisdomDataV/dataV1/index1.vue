<template>
  <div
    class="w-full text-white h-screen bg-cover"
    :style="'background-image: url(' + bgUrl + ');'"
  >
    <dv-border-box-11
      :title="route.query.taskName"
      :titleWidth="400"
      :color="['#0dd5f4', '#0a2732']"
      class="py-14 relative"
    >
      <div class="mx-8 h-full overflow-y-auto hideScroll">
        <div class="center relative">
          <div class="absolute top-2 right-32 text-base">
            <timeNow />
          </div>
        </div>
        <div class="mb-4">
          <a-button ghost type="primary">进展一览</a-button>
          <a-button class="ml-2" @click="seeKernelIndex" ghost
            >核心数据</a-button
          >
        </div>
        <span class="text-lg border-l-4 border-solid border-sky-400 px-2"
          >数据概览</span
        >
        <!-- <dv-border-box-8 :reverse="true" class="p-8"> -->
        <div class="grid grid-cols-2 gap-5 px-12">
          <div
            class="relative h-32 flex flex-col justify-center items-center"
            style="background-color: #ff9900"
          >
            <div>未完成任务数</div>
            <div class="font-bold text-2xl">
              <countTo
                :startVal="0"
                :endVal="unCompleteTaskList"
                :duration="3000"
                class="mx-auto"
              ></countTo>
            </div>
            <div
              class="absolute right-2 bottom-2 cursor-pointer underline"
              @click="seeTaskDetail('unfinished')"
            >
              更多>>
            </div>
          </div>
          <div
            class="relative h-32 flex flex-col justify-center items-center"
            style="background-color: #93c5fd"
          >
            <div>已完成任务数</div>
            <div class="font-bold text-2xl">
              <countTo
                :startVal="0"
                :endVal="completeTaskList"
                :duration="3000"
                v-if="flagT"
                class="mx-auto"
              ></countTo>
            </div>
            <div
              class="absolute right-2 bottom-2 cursor-pointer underline"
              @click="seeTaskDetail('finished')"
            >
              更多>>
            </div>
          </div>
        </div>
        <!-- </dv-border-box-8> -->
        <div class="grid grid-cols-5 gap-12">
          <div class="col-span-2">
            <div
              class="text-lg border-l-4 border-solid border-sky-400 px-2 my-4"
            >
              各部门任务执行情况（正在进行/已完成数）
            </div>

            <div
              class="flex justify-between px-4 my-2"
              v-for="(item, index) in departmentTaskInfo"
              :key="item"
            >
              <div>{{ item.departmentName }}：</div>
              <div
                class="w-52 center"
                :class="index % 2 == 1 ? 'bg-cyan-700' : 'bg-cyan-900'"
              >
                {{ item.unCompleteTaskListSize }}/{{
                  item.completeTaskListSize
                }}
              </div>
            </div>
          </div>
          <div class="col-span-3">
            <div class="text-base my-4 flex justify-between">
              <div
                class="text-lg border-l-4 border-solid border-sky-400 px-2 my-4"
              >
                任务执行情况汇总
              </div>
              <div
                class="underline cursor-pointer hover:text-blue-400"
                @click="seeMore"
              >
                查看更多>>>
              </div>
            </div>
            <div class="h-full">
              <div class="flex justify-around">
                <div class="center" v-for="item in firstTaskInfo" :key="item">
                  <el-progress
                    type="circle"
                    :percentage="item.rate"
                    width="120"
                    color="#22d3ee"
                  >
                    <template #default="{ percentage }">
                      <div class="flex flex-col justify-center items-center">
                        <div class="percentage-value text-white text-sm">
                          {{ percentage }}%
                        </div>
                        <div class="percentage-label text-white text-sm w-3/4">
                          {{ item.taskName }}
                        </div>
                      </div>
                    </template>
                  </el-progress>
                </div>
              </div>
              <div class="w-full h-64">
                <dv-charts id="container_myechart" :option="option1" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="text-lg border-l-4 border-solid border-sky-400 px-2 my-4">
            滚动消息
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="h-40 border border-sky-600">
              <dv-scroll-board
                v-if="config1.data.length > 0"
                :config="config1"
                class="h-full"
              />
              <div class="w-full h-full center" v-else>暂无消息</div>
            </div>
            <div class="h-40 border border-sky-600">
              <dv-scroll-board
                v-if="config2.data.length > 0"
                :config="config2"
                class="h-full"
              />
              <div class="center w-full h-full" v-else>暂无消息</div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-11>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  reactive,
  defineComponent,
  shallowRef,
  onUnmounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import { get, post } from "@/awsuiAxios/index.js";
import isDev from "@/config/index.js";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import timeNow from "./component/timeNow.vue";
import { getProgressDataApi } from "@/api/wisdomDataV.js";
import countTo from "@/components/countTo";

const router = useRouter();
const route = useRoute();

const unCompleteTaskList = ref(0);
const completeTaskList = ref(0);
const departmentTaskInfo = ref([]);
const firstTaskInfo = ref([]);
const config1 = ref({
  data: [],
});
const config2 = ref({
  data: [],
});

const option1 = ref({
  title: {
    text: "",
    style: {
      fill: "#ffffff",
    },
  },
  legend: {
    data: [],
    top: "10",
    orient: "vertical",
    textStyle: {
      fontFamily: "Arial",
      fontSize: 13,
      fill: "#fff",
    },
  },
  xAxis: {
    name: "",
    data: [],
    axisLabel: {
      style: {
        fill: "#ffffff",
      },
    },
    axisLine: {
      // show: false,
      style: {
        stroke: "#fff",
        lineWidth: 1,
      },
    },
    nameTextStyle: {
      fill: "#ffffff",
    },
  },
  yAxis: {
    name: "任务进展情况",
    data: "value",
    axisLabel: {
      style: {
        fill: "#ffffff",
      },
    },
    axisLine: {
      // show: false,
      style: {
        stroke: "#fff",
        lineWidth: 1,
      },
    },
    splitLine: {
      show: false,
    },
    min: 0,
    // axisLine: {
    //   show: false,
    // },
    nameTextStyle: {
      fill: "#ffffff",
    },
  },
  series: [],
});

onMounted(async () => {
  await getRemoteData();
});

const getRemoteData = () => {
  return getProgressDataApi({ projectCode: route.query.projectCode }).then(
    (res) => {
      if (res.result == "ok") {
        unCompleteTaskList.value = res.data.unCompleteTaskList;
        completeTaskList.value = res.data.completeTaskList;
        departmentTaskInfo.value = res.data.departmentTaskInfo;
        firstTaskInfo.value = res.data.firstTaskInfo;
        option1.value.xAxis.data = res.data.taskProgressInfo.dateList;
        option1.value.legend.data = res.data.taskProgressInfo.list.map(
          (item) => {
            return item.name;
          }
        );

        option1.value.series = res.data.taskProgressInfo.list.map((item) => {
          return {
            name: item.name,
            data: item.list,
            type: "line",
            stack: "a",
            fill: {
              show: true,
            },
          };
        });
        config1.value.data = res.data.fileRecord.map((item) => {
          return [`${item.user}在${item.time}上传了${item.fileName}`];
        });
        config2.value.data = res.data.messageRecord.map((item) => {
          return [`${item.user}在${item.time}反馈了${item.taskName}`];
        });
      }
    }
  );
};

const flagT = ref(true);
let timer = setInterval(() => {
  flagT.value = false;
  // 建议加上 nextTick 微任务
  // 否则在同一事件内同时将tableShow设置false和true有可能导致组件渲染失败
  nextTick(function () {
    // 加载
    flagT.value = true;
  });
}, 6000);
onBeforeUnmount(() => {
  clearInterval(timer);
});
let bgUrl = isDev ? "/bg.png" : "/portal/console/images/bg.png";

const seeMore = () => {
  router.push({
    path: "/wisdomDataV_dataV1_index2",
    query: { ...route.query },
  });
};

const seeKernelIndex = () => {
  router.push({
    path: "/wisdomDataV_dataV1_index3",
    query: { ...route.query },
  });
};

const seeTaskDetail = (type) => {
  router.push({
    path: "/wisdomDataV_dataV1_index4",
    query: { ...route.query, type },
  });
};

watch(
  () => {
    return route.query;
  },
  () => {
    getRemoteData();
  }
);
</script>

<style lang="less" scoped>
.height1 {
  height: calc(100% - 24px);
}
</style>
