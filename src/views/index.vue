<template>
  <div>
    <a-spin :spinning="pinia.spin">
      <div class="boxContainer">
        <div class="leftMenu">
          <left-menu></left-menu>
        </div>
        <div class="rightContainer">
          <router-view></router-view>
        </div>
      </div>
    </a-spin>
    <div
      class="w-screen h-screen fixed top-0 left-0 z-10 bg-slate-400 bg-opacity-30 center"
      v-if="fullscreenLoading"
    >
      <a-spin tip="加载中" size="large" />
    </div>
  </div>
</template>
<script setup>
import LeftMenu from "@/layout/leftMenu.vue";
import { computed } from "vue";
import { usePiniaStore } from "@/pinia";
import { useStore } from "vuex";

const pinia = usePiniaStore();

const store = useStore();

const fullscreenLoading = computed(() => store.state.isLoading);
</script>
<style scoped>
.boxContainer {
  display: flex;
  height: 100vh;
}
.leftMenu {
  width: 150px;
  height: 100%;
}
.rightContainer {
  height: 100%;
  width: calc(100% - 150px);
  padding-left: 5px;
  padding-top: 8px;
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
