<template>
  <span class="text-blue-400 underline cursor-pointer" @click="openModel">
    {{ props.name }}({{ props.userId }})
  </span>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["userId", "name"]);

const openModel = () => {
  store.commit("setPersonInfoConfig", { userId: props.userId, visible: true });
};
</script>

<style></style>
