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
    <span v-if="props.projectModelList.length == 0" class="mx-2">暂无模板</span>
    <a-button @click="openSeeMore">查看更多</a-button>
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
    <a-modal v-model:open="seeMoreVisible" :footer="null" style="width: 900px">
      <template #title> </template>
      <div class="grid grid-cols-3">
        <div
          v-for="item in projectModelList"
          class="border w-64 p-4"
          :key="item.templateCode"
        >
          <div>{{ item.templateName }}</div>
          <div>设计依据:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.designBasis }}</div>
          <div>说明:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.description }}</div>
          <div>
            <a-button
              class="float-right"
              @click="
                seeMoreVisible = false;
                openAddProject(item.templateCode);
              "
              >创建项目</a-button
            >
            <div class="clear-right"></div>
          </div>
        </div>
        <div class="border w-64 p-4 center" v-if="projectModelList.length <= 6">
          更多模板敬请期待！
        </div>
        <div v-if="projectModelList.length == 0">暂无模板</div>
      </div>
      <div>
        <a-pagination
          v-model:current="pageNum"
          v-model:pageSize="pageSize"
          @change="getProjectModelList"
          :total="total"
          class="float-right"
        />
        <div class="clear-right"></div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import { getProjectModelApi } from "@/api/taskManage.js";

const props = defineProps(["projectModelList", "openAddProject"]);

const visible = ref(false);
const seeMoreVisible = ref(false);

const projectModelList = ref([]);

const pageSize = ref(6);
const pageNum = ref(1);
const total = ref(0);

const selectRow = ref({});

const selectRowClick = (item) => {
  selectRow.value = item;
  visible.value = true;
};

const openSeeMore = async () => {
  await getProjectModelList();
  seeMoreVisible.value = true;
};

const getProjectModelList = () => {
  return getProjectModelApi({
    page: pageNum.value,
    pageSize: pageSize.value,
  }).then((res) => {
    if (res.result == "ok") {
      projectModelList.value = res.data.templateData;
      total.value = res.data.total;
    }
  });
};
</script>

<style></style>
