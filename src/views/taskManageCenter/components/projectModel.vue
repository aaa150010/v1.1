<template>
  <div class="p-4 flex items-center border-b cursor-pointer">
    <span class="ml-2">项目模板</span>
    <span
      class="border px-1 py-2 mx-4 text-blue-700 underline"
      v-for="item in props.projectModelList"
      :key="item.templateCode"
      @click="selectRowClick(item)"
      >{{ item.templateName }}</span
    >
    <span class="border px-9 py-2 mx-4 text-blue-700 underline">查看更多</span>
    <a-modal v-model:open="visible">
      <template #title> </template>
      <a-form>
        <a-form-item label="名称">
          <div>{{ selectRow.templateName }}</div>
        </a-form-item>
        <a-form-item label="设计依据">
          <div>{{ selectRow.designBasis }}</div>
        </a-form-item>
        <a-form-item label="说明">
          <div>{{ selectRow.description }}</div>
        </a-form-item>
      </a-form>
      <template #footer>
        <div class="flex justify-between">
          <a-button @click="visible = false">取消</a-button>
          <a-button
            type="primary"
            @click="
              () => {
                visible = false;
                openAddProject(selectRow.templateCode);
              }
            "
            >使用当前模板创建项目</a-button
          >
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";

const props = defineProps(["projectModelList", "openAddProject"]);

const visible = ref(false);

const selectRow = ref({});

const selectRowClick = (item) => {
  selectRow.value = item;
  visible.value = true;
};
</script>

<style></style>
