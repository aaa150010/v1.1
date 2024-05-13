<template>
  <div
    class="w-full text-white h-screen"
    :style="'background-image: url(' + bgUrl + ');'"
  >
    <dv-border-box-11
      :title="route.query.taskName"
      :titleWidth="400"
      :color="['#0dd5f4', '#0a2732']"
      class="py-14"
    >
      <div class="mx-8 h-full overflow-y-auto hideScroll">
        <div class="center relative">
          <div class="absolute top-2 right-32 text-base">
            <timeNow />
          </div>
        </div>
        <div class="mb-4">
          <a-button ghost @click="seeProgress">进展一览</a-button>
          <a-button class="ml-2" type="primary" ghost>核心数据</a-button>
        </div>
        <div class="height1 flex p-2">
          <div class="h-full w-6">
            <div
              class="px-1 center border mb-1 cursor-pointer hover:bg-sky-600 bg-sky-600"
            >
              办学条件
            </div>
            <div
              class="px-1 center border mb-1 cursor-pointer hover:bg-sky-600"
            >
              专业课程
            </div>
            <div
              class="px-1 center border mb-1 cursor-pointer hover:bg-sky-600"
            >
              人才培养
            </div>
            <div
              class="px-1 center border mb-1 cursor-pointer hover:bg-sky-600"
            >
              师资队伍
            </div>
          </div>
          <div class="h-full ml-2 width1 overflow-y-auto">
            <div class="my-6 text-base" v-for="item in 36" :key="item">
              <div class="grid grid-cols-7">
                <div class="text-blue-400 text-base pl-6">
                  教学科研及辅助用房面积（平方米）
                </div>
                <div class="center">138963.16</div>
                <div class="center">去年对比增幅：3%</div>
                <div class="center">-</div>
                <div class="center">省内排名：1</div>
                <div class="center">对比去年排名：+1</div>
                <div class="center">-</div>
              </div>
              <div class="px-12">
                <div class="border-b border-sky-600"></div>
              </div>
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
} from "vue";
import { get, post } from "@/awsuiAxios/index.js";
import isDev from "@/config/index.js";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import timeNow from "./component/timeNow.vue";

import countTo from "@/components/countTo";

const router = useRouter();
const route = useRoute();

let bgUrl = isDev ? "/bg.png" : "/portal/console/images/bg.png";

const seeProgress = () => {
  router.push({
    path: "/wisdomDataV_dataV1_index1",
    query: { ...route.query },
  });
};
</script>

<style lang="less" scoped>
.height1 {
  height: calc(100% - 60px);
}
.width1 {
  width: calc(100% - 2rem);
}
</style>
