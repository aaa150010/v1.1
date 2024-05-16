<template>
  <a-modal
    v-model:open="visible"
    title="个人信息"
    :footer="null"
    :onCancel="onCancel"
    destroyOnClose
  >
    <personInfoForm />
  </a-modal>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import personInfoForm from "./personInfoForm.vue";
let store = useStore();

const visible = computed(() => store.state.personInfoConfig.visible);

const onCancel = () => {
  store.commit("setPersonInfoConfig", { visible: false });
};
</script>
<style scoped>
.fieldItem {
  height: 32px;
  margin-bottom: 24px;
}
</style>
