<template>
  <div
    class="w-full h-screen overflow-y-auto text-white"
    :style="'background-image: url(' + bgUrl + ')'"
  >
    <dv-border-box-11
      :title="route.query.taskName"
      :titleWidth="400"
      :color="['#0dd5f4', '#0a2732']"
      class="py-14"
    >
      <div class="mx-8 h-full overflow-y-auto hideScroll">
        <div class="center relative">
          <div
            class="absolute top-2 left-32 text-base underline cursor-pointer hover:text-blue-400"
            @click="goBack"
          >
            {{ "<<<返回" }}
          </div>
          <!-- <div class="center w-96 text-base border p-2 rounded-md">
            {{ route.query.taskName }}
          </div> -->
          <div class="absolute top-2 right-32 text-base">
            <timeNow />
          </div>
        </div>
        <div class="">
          <div v-for="item in dataList" :key="item">
            <!-- <div
              class="text-lg border-l-4 border-solid border-sky-400 px-2 my-4"
            >
              {{ item.tname }}
            </div> -->
            <div class="center my-2">{{ item.taskName }}</div>
            <div class="flex justify-around">
              <el-progress
                v-for="itemChild in item.children"
                :key="itemChild"
                type="circle"
                :percentage="itemChild.rate"
                color="#22d3ee"
              >
                <template #default="{ percentage }">
                  <div class="flex flex-col justify-center items-center">
                    <div class="percentage-value text-white text-sm">
                      {{ percentage }}%
                    </div>
                    <div class="percentage-label text-white text-sm w-3/4">
                      {{ itemChild.taskName }}
                    </div>
                  </div>
                  <!-- <div class="percentage-value text-white text-sm">
                    {{ percentage }}%
                  </div>
                  <div class="percentage-label text-white text-sm">
                    {{ itemChild.taskName }}
                  </div> -->
                </template>
              </el-progress>
            </div>
            <div class="border-b my-2 w-full border-sky-600"></div>
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
} from "vue";
import { get, post } from "@/awsuiAxios/index.js";
import isDev from "@/config/index.js";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import timeNow from "./component/timeNow.vue";
import { getSecondTaskApi } from "@/api/wisdomDataV.js";
import countTo from "@/components/countTo";
const router = useRouter();
const route = useRoute();

const dataList = ref([]);

onMounted(() => {
  getRemoteData();
});

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

const getRemoteData = () => {
  // dataList.value = [
  //   {
  //     tname: "A.办学方向与依法治校 （ 15 分）",
  //     list: [
  //       {
  //         taskName: "A2.依法治校 （6分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "A1.办学方向 （9分）",
  //         sum: "0.00",
  //       },
  //     ],
  //   },
  //   {
  //     tname: "B.办学条件与资源 （31分）",
  //     list: [
  //       {
  //         taskName: "B2.办学投入 （7分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "B1.硬件设施 （6分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "B3.师资队伍 （8分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "B5.数字化资源（3分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "B4.实习实训资源（7分）",
  //         sum: "0.00",
  //       },
  //     ],
  //   },
  //   {
  //     tname: "C.办学质量与水平 （36分）",
  //     list: [
  //       {
  //         taskName: "C1.专业建设 （20分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "C3.创新成果 （4分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "C2.社会服务 （12分）",
  //         sum: "0.00",
  //       },
  //     ],
  //   },
  //   {
  //     tname: "D.办学声誉与特色 （18分）",
  //     list: [
  //       {
  //         taskName: "D1.办学声誉 （5分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "D2.特色发展 （3分）",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "D3.满意度评价（10分）",
  //         sum: "0.00",
  //       },
  //     ],
  //   },
  //   {
  //     tname: "E.加减分",
  //     list: [
  //       {
  //         taskName: "加分项",
  //         sum: "0.00",
  //       },
  //       {
  //         taskName: "减分项",
  //         sum: "0.00",
  //       },
  //     ],
  //   },
  // ];
  return getSecondTaskApi({
    projectCode: route.query.projectCode,
  }).then((res) => {
    if (res.result == "ok") {
      dataList.value = res.data;
    }
  });
};

const goBack = () => {
  router.go(-1);
};

let bgUrl = isDev ? "/bg.png" : "/portal/console/images/bg.png";
</script>

<style></style>
