<template>
  <div>
    <div class="fieldItem">姓名：{{ personObj.userName }}</div>
    <div class="fieldItem">工号：{{ userId }}</div>
    <div class="fieldItem">所属部门：{{ personObj.companyName }}</div>
    <div class="fieldItem">座机电话：</div>
    <div class="fieldItem">移动电话：</div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { getUserInfoByInfo } from "@/api/user";
import { useStore } from "vuex";

let store = useStore();

const userId = computed(() => store.state.personInfoConfig.userId);

const personObj = ref({});

onMounted(() => {
  getUserInfoByInfo(userId.value).then((res) => {
    if (res.result == "ok") {
      personObj.value = res.data;
    }
  });
});
</script>

<style></style>
