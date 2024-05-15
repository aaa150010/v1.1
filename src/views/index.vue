<template>
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
