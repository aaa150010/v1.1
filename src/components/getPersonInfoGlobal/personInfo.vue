<template>
  <div class="txt_over_one">
    <span>{{ title ? title : "" }}</span>
    <span class="text-blue-400 underline cursor-pointer" @click="openModel"
      >{{ props.name }}({{ props.userId }})</span
    >
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["userId", "name", "title"]);

const openModel = () => {
  store.commit("setPersonInfoConfig", { userId: props.userId, visible: true });
};
</script>

<style></style>
