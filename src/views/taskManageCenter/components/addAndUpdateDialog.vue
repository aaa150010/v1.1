<template>
  <div>
    <a-modal v-model:open="nodeConfig.visible" :footer="null">
      <template #title>
        <div>{{ nodeConfig.title }}</div>
      </template>
      <addAndUpdateForm :formData="{}" :type="nodeConfig.type" />
    </a-modal>
  </div>
</template>
<script setup>
import { ref, defineProps, computed } from "vue";
import { useStore } from "vuex";
import addAndUpdateForm from "./addAndUpdateForm.vue";

const store = useStore();
const nodeConfig = computed(() => store.state.nodeConfig);
</script>
