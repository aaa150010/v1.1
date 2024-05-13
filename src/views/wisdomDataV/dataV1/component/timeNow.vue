<template>
  <span>
    {{ timerValue }}
  </span>
</template>

<script setup>
import {
  ref,
  onMounted,
  reactive,
  defineComponent,
  shallowRef,
  onUnmounted,
} from "vue";

const getFormattedCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份是从0开始计数的，需要加1
  const day = now.getDate();
  const weekDay = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ][now.getDay()];
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // 对于非标准格式的月份和日期，我们可以简化显示，例如月份只显示小数点前的数字
  const formattedMonth = month.toString().replace(/^(\d)$/, ".$1");
  const formattedDate = `${year}${formattedMonth}.${day}`;

  return `${formattedDate} ${weekDay} ${hours}:${minutes}:${seconds}`;
};

const timerValue = ref(getFormattedCurrentTime());

let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    timerValue.value = getFormattedCurrentTime();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style></style>
