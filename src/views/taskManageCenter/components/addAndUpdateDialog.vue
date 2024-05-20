<template>
  <div>
    <a-modal
      v-model:open="nodeConfig.visible"
      destroyOnClose
      :footer="null"
      width="700px"
    >
      <template #title>
        <div>{{ nodeConfig.title }}</div>
      </template>
      <addAndUpdateForm
        :getProjectTree="props.getProjectTree"
        :deptListTree="deptListTree"
        :peopleListTree="peopleListTree"
      />
    </a-modal>
  </div>
</template>
<script setup>
import { ref, defineProps, computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
  getSelectDataApi,
  addNodeApi,
  updateNodeApi,
} from "@/api/taskManage.js";
import addAndUpdateForm from "./addAndUpdateForm.vue";
const store = useStore();

const props = defineProps(["getProjectTree"]);
const nodeConfig = computed(() => store.state.nodeConfig);

const deptListTree = ref([]);
const peopleListTree = ref([]);

onMounted(async () => {
  await getDeptListTree();
  await getPeopleListTree();
});

const getDeptListTree = () => {
  return getSelectDataApi({ type: "department" }).then((res) => {
    if (res.result == "ok") {
      deptListTree.value = res.data;
    }
  });
};

const getPeopleListTree = () => {
  return getSelectDataApi({
    type: "person",
  }).then((res) => {
    if (res.result == "ok") {
      peopleListTree.value = res.data.map((item) => {
        item.selectable = false;
        return item;
      });
    }
  });
};
</script>
