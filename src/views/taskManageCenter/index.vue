<template>
  <div class="workbenchContainer">
    <div class="flex h-full">
      <div class="w-48 py-2 h-full">
        <div class="center px-2 mb-2">
          <a-button type="primary" @click="openAddProject">新建项目</a-button>
        </div>
        <div class="border h-residue1 p-2">
          <div class="h-8">
            <a-button size="small" class="float-right ml-2">
              <template #icon>
                <SortAscendingOutlined />
              </template>
            </a-button>
            <a-button size="small" class="float-right ml-2">
              <template #icon>
                <FilterOutlined />
              </template>
            </a-button>
          </div>
          <div class="overflow-y-auto h-residue2">
            <div
              v-for="(item, index) in 4"
              class="h-24 border mt-2 p-2 cursor-pointer hover:bg-cyan-300"
              :class="index == activeKey ? 'bg-cyan-300' : ''"
              @click="selectRowProject(index)"
              :key="item"
            >
              <div>2024高等职业学校教学考核</div>
              <div>2024.2.1~2024.11.2</div>
              <div class="flex justify-around items-center">
                <span>50%</span>
                <a-progress
                  :percent="50"
                  :size="8"
                  strokeLinecap="square"
                  class="w-20"
                  :show-info="false"
                />
                <span>>></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-residue1" style="padding-left: 5px; padding-right: 5px">
        <div class="border h-residue3">
          <div class="p-4 flex items-center border-b">
            <span class="ml-2">项目模板</span>
            <span
              class="border px-1 py-2 mx-4 text-blue-700 underline"
              v-for="item in 7"
              :key="item"
              >2023高校综合考核模板</span
            >
            <span class="border px-9 py-2 mx-4 text-blue-700 underline"
              >查看更多</span
            >
          </div>
          <div class="flex justify-between items-center p-2 border-b">
            <div>
              <span>2024高等职业学校教学质量考核</span>
              <a-tag class="ml-2" color="green">已上架</a-tag>
              <a-tag color="blue">执行中</a-tag>
              <span>2024.2.1 12:15:00 ~ 2024.11.2 18:00:00</span>
            </div>
            <div>
              <a-button class="">关闭反馈</a-button>
              <a-button class="ml-2">项目下架</a-button>
            </div>
          </div>
          <div>{{ activeKey }}</div>
          <div class="w-full h-full p-2"><mind></mind></div>
        </div>
      </div>
    </div>
    <addAndUpdateDialog />
    <a-modal
      v-model:open="addVisible"
      ok-text="确认"
      cancel-text="取消"
      @ok="addProject"
    >
      <template #title>
        <div>新建项目</div>
      </template>
      <a-form
        ref="formProjectRef"
        :model="formProject"
        :rules="formProjectRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="项目隶属年份" name="projectYear">
          <a-input v-model:value="formProject.projectName" />
        </a-form-item>
        <a-form-item label="项目名称" name="projectName">
          <a-input v-model:value="formProject.projectName" /> </a-form-item
      ></a-form>
      <a-form-item label="项目开始时间" name="startTime">
        <a-date-picker
          v-model:value="formProject.startTime"
          format="YYYY-MM-DD HH:mm:ss"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
        />
      </a-form-item>
      <a-form-item label="项目截止时间" name="endTime">
        <a-date-picker
          v-model:value="formProject.endTime"
          format="YYYY-MM-DD HH:mm:ss"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
        />
      </a-form-item>
      <a-form-item label="项目模板" name="templateCode">
        <a-select v-model:value="formProject.templateCode">
          <!-- <a-select-option value="001">模板1</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item label="是否直接发布（项目上架）" name="isListed">
        <a-radio-group v-model:value="formProject.isListed">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否开启反馈" name="isFeedback">
        <a-radio-group v-model:value="formProject.isFeedback">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { SortAscendingOutlined, FilterOutlined } from "@ant-design/icons-vue";
import mind from "./mind.vue";
import addAndUpdateDialog from "./components/addAndUpdateDialog.vue";
import { useStore } from "vuex";
import dayjs, { Dayjs } from "dayjs";

const store = useStore();

const activeKey = ref(0);

const selectRowProject = (index) => {
  activeKey.value = index;
};
onMounted(() => {});

const addVisible = ref(false);
const formProjectRef = ref(null);
const formProject = ref({
  projectYear: "",
  projectName: "",
  startTime: "",
  endTime: "",
  templateCode: "",
  isListed: false,
  isFeedback: true,
});

const formProjectRules = ref({
  projectYear: [{ required: true, message: "请选择项目年份", trigger: "blur" }],
  projectName: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
  startTime: [
    { required: true, message: "请选择项目开始时间", trigger: "blur" },
  ],
  endTime: [{ required: true, message: "请选择项目截止时间", trigger: "blur" }],
  templateCode: [
    { required: true, message: "请选择项目模块", trigger: "blur" },
  ],
  isListed: [],
  isFeedback: [],
});

const labelCol = { span: 5 };
const wrapperCol = { span: 13 };

const openAddProject = () => {
  addVisible.value = true;
};

const addProject = () => {
  formProjectRef.value.validate().then(() => {
    addVisible.value = false;
  });
};
</script>
<style scoped>
.workbenchContainer {
  width: 100%;
  height: 100%;
}
.w-residue1 {
  width: calc(100% - 12rem);
}
.h-residue1 {
  height: calc(100% - 3rem);
}
.h-residue2 {
  height: calc(100% - 1.5rem);
}
.h-residue3 {
  height: calc(100% - 1rem);
}
</style>
