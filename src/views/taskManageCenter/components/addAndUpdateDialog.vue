<template>
  <div>
    <a-modal
      v-model:open="nodeConfig.visible"
      ok-text="确认"
      cancel-text="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
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
const handleOk = () => {
  store.commit("setNodeConfig", { visible: false });
};
const handleCancel = () => {
  store.commit("setNodeConfig", { visible: false });
};
</script>
