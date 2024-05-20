<template>
  <div
    class="w-full text-white h-screen bg-cover"
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
          <div class="ml-2 inline-block select-wrap">
            <a-select
              v-model:value="yearValue"
              class="w-36"
              @change="getCoreData"
              placeholder="请选择年份"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
              <a-select-option
                v-for="item in yearList"
                :key="item"
                :value="item"
                >{{ item }}</a-select-option
              >
            </a-select>
          </div>
        </div>
        <div class="height1 flex p-2">
          <div class="h-full w-6">
            <div
              class="px-1 center border mb-1 cursor-pointer hover:bg-sky-600"
              v-for="(item, index) in dataTree"
              :key="item.typeCode"
              :class="index == activeIndex ? 'bg-sky-600' : ''"
              @click="activeIndex = index"
            >
              {{ item.typeName }}
            </div>
          </div>
          <div
            v-if="dataTree.length > 0"
            class="h-full ml-2 width1 overflow-y-auto"
          >
            <div
              class="my-6 text-base"
              v-for="item in dataTree[activeIndex].children"
              :key="item.itemCode"
            >
              <div class="grid grid-cols-7">
                <div class="text-blue-400 text-base pl-6 font-bold">
                  {{ item.itemName }}
                </div>
                <div class="center">{{ item.value }}</div>
                <div class="center">
                  去年对比增幅：<span
                    :class="
                      item.valueDiffType == '上升'
                        ? 'text-red-400'
                        : 'text-blue-400'
                    "
                    >{{ item.valueDiffWithLastYear }}</span
                  >
                </div>
                <div class="center">
                  <ArrowUpOutlined
                    v-if="item.valueDiffType == '上升'"
                    class="text-2xl text-red-400"
                  />
                  <ArrowDownOutlined
                    v-else-if="item.valueDiffType == '下降'"
                    class="text-2xl text-blue-400"
                  />
                  <div v-else>-</div>
                </div>
                <div class="center">省内排名：{{ item.provinceOrder }}</div>
                <div class="center">
                  对比去年排名：<span
                    :class="
                      item.orderDiffType == '上升'
                        ? 'text-red-400'
                        : 'text-blue-400'
                    "
                    >{{ item.orderDiffWithLastYear }}</span
                  >
                </div>
                <div class="center">
                  <ArrowUpOutlined
                    v-if="item.orderDiffType == '上升'"
                    class="text-2xl text-red-400"
                  />
                  <ArrowDownOutlined
                    v-else-if="item.orderDiffType == '下降'"
                    class="text-2xl text-blue-400"
                  />
                  <div v-else>-</div>
                </div>
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
import { getCoreDataApi } from "@/api/wisdomDataV.js";
import countTo from "@/components/countTo";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons-vue";
import dayjs, { Dayjs } from "dayjs";

const activeIndex = ref(0);

const yearValue = ref(dayjs().format("YYYY"));

const yearList = ref([
  dayjs().format("YYYY") - 5,
  dayjs().format("YYYY") - 4,
  dayjs().format("YYYY") - 3,
  dayjs().format("YYYY") - 2,
  dayjs().format("YYYY") - 1,
  dayjs().format("YYYY"),
]);

const router = useRouter();
const route = useRoute();

const dataTree = ref([]);

let bgUrl = isDev ? "/bg.png" : "/portal/console/images/bg.png";

onMounted(async () => {
  await getCoreData();
});

const seeProgress = () => {
  router.push({
    path: "/wisdomDataV_dataV1_index1",
    query: { ...route.query },
  });
};

const getCoreData = () => {
  return getCoreDataApi({
    school: isDev ? "0005" : "0001",
    year: yearValue.value,
  }).then((res) => {
    if (res.result == "ok") {
      dataTree.value = res.data;
    }
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
:deep(:where(.css-dev-only-do-not-override-1hsjdkk).ant-select:not(.ant-select-customize-input) .ant-select-selector) {
  background-color: rgb(0, 12, 49)!important;
  color: #fff!important;
}
:deep(:where(.css-dev-only-do-not-override-1hsjdkk).ant-select-dropdown){
  color: #fff;
  background-color: rgb(4, 37, 80)!important;
}
:deep(:where(.css-dev-only-do-not-override-1hsjdkk).ant-select-dropdown .ant-select-item){
  color: #fff!important;
}
:deep(:where(.css-dev-only-do-not-override-1hsjdkk).ant-select .ant-select-arrow){
  color: #fff;
}
:deep(:where(.css-dev-only-do-not-override-1hsjdkk).ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled)){
  background-color: blue!important;
  color: #fff!important;
}
:deep(:where(.css-dev-only-do-not-override-1hsjdkk).ant-select-dropdown .ant-select-item-option-selected ){
  color: red!important;
}
:deep(:where(.css-dev-only-do-not-override-1hsjdkk).ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled)){
  color: #fff!important;
  background-color: blue!important;
}
</style>
