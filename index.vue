<template>
  <!-- <el-config-provider :locale="zhCn"> -->
  <!-- <div style="height: 115px"></div> -->
  <div class="warp">
    <el-upload
      ref="exportTask"
      :auto-upload="false"
      :onChange="fileChange"
      :limit="1"
      class="hidden"
      :on-exceed="handleExceed"
    >
      <button class="hidden" ref="exportButton">点击</button>
    </el-upload>
    <!-- <div class="py-4">
      <span class="float-left cursor-pointer" @click="back"
        ><el-icon size="32"><Back /></el-icon
      ></span>
      <div class="h-8 center text-2xl font-bold">{{ parentRow.nodeName }}</div>
    </div>
    <div
      v-if="parentRow.nodeTaskExecutorName == initSearchValue"
      class="border border-blue-300 border-solid mb-2 p-2 overflow-hidden"
    >
      <el-button type="primary" v-if="isNotExpandAfter" @click="expendAll"
        >展开全部</el-button
      >
      <el-button type="primary" v-else @click="expendAll">收缩全部</el-button>
      <div class="float-right">
        <el-select
          v-model="searchSelectValue"
          class="m-2"
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in searchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="searchValue"
          placeholder="请输入查询内容"
          size="small"
          style="width: 250px"
          :suffix-icon="Search"
          @change="searchValueChange"
        >
        </el-input>
      </div>
    </div> -->
    <div
      class="relative flex items-center mind overflow-hidden border-blue-300 border-solid"
      id="mindMap"
      v-loading="mindLoading"
      element-loading-text="加载中"
      ref="refresh"
    >
      <mindItem
        :list="list"
        :style="'transform: scale(' + num + ')'"
        @openNewDialog="openNewDialog"
        @openDetailDialog="openDetailDialog"
        @openBinding="openBinding"
        @openUpdate="openUpdate"
        @openAllocation="openAllocation"
        @clearBorder="clearBorder"
        @clickExport="clickExport"
        @init="init"
        class="absolute"
        v-drag
      ></mindItem>
      <div v-if="list.length == 0" class="w-full">
        <el-empty description="查询为空！" />
      </div>
    </div>
    <el-dialog
      v-model="newDialog"
      title="新建项目"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="projectFormRef"
        :model="projectForm"
        :rules="rules"
        :size="formSize"
        status-icon
      >
        <el-form-item label="项目名称" prop="nodeName">
          <el-input v-model="projectForm.nodeName" />
        </el-form-item>
        <el-form-item label="项目负责部门" prop="nodeTaskExecutorDeptId">
          <el-select
            v-model="projectForm.nodeTaskExecutorDeptId"
            @change="changeProDept"
            clearable
            filterable
            placeholder="请选择部门"
          >
            <el-option
              v-for="item in listDept"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目负责人" prop="nodeTaskExecutorId">
          <el-select
            v-model="projectForm.nodeTaskExecutorId"
            placeholder="请选择项目负责人"
            @change="changeProPeo"
            clearable
            filterable
          >
            <el-option
              v-for="item in listPeo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目开始时间" required>
          <el-col :span="11">
            <el-form-item prop="nodeStartTime">
              <el-date-picker
                v-model="projectForm.nodeStartTime"
                type="date"
                placeholder="项目开始时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="项目结束时间" required>
          <el-col :span="11">
            <el-form-item prop="nodeEndTime">
              <el-date-picker
                v-model="projectForm.nodeEndTime"
                type="date"
                placeholder="项目结束时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="是否有年度任务" required>
          <el-col :span="11">
            <mySwitch v-model="projectForm.isLeaf"></mySwitch>
          </el-col>
        </el-form-item>
        <el-form-item label="预警时间（天）" prop="earlyWarningDate">
          <el-input v-model="projectForm.earlyWarningDate" />
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="projectForm.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="newDialog = false">取消</el-button>
          <el-button type="primary" @click="addProject(projectFormRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer
      :with-header="false"
      size="60%"
      v-model="detailDialog"
      destroy-on-close
    >
      <itemDetail
        :annualList="annualList"
        @closeDetailDialog="closeDetailDialog"
        @getAnnualList="getAnnualList"
        @init="init"
        :selectRow="selectRow"
      ></itemDetail>
    </el-drawer>
    <el-dialog
      v-model="bindingVisible"
      title="绑定年度任务"
      width="30%"
      append-to-body
    >
      <el-select
        v-model="selectRow.data.bindAnnualId"
        class="m-2"
        placeholder="请绑定年度任务"
      >
        <el-option
          v-for="itemObj in annualList.data"
          :key="itemObj.id"
          :label="itemObj.annualName"
          :value="itemObj.id"
        />
      </el-select>
      <template #footer>
        <el-button @click="bindingVisible = false">取消</el-button>
        <el-button type="primary" @click="bindAnnual"> 确定 </el-button>
      </template>
    </el-dialog>
    <el-dialog
      v-model="allocationVisible"
      title="分配授权人"
      width="30%"
      append-to-body
    >
      <div class="flex justify-between">
        <el-select
          v-model="allocationPeople.nodeTaskExecutorDeptId"
          @change="changeProDept"
          clearable
          filterable
          placeholder="请选择部门"
        >
          <el-option
            v-for="item in listDept"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="allocationPeople.nodeTaskExecutorId"
          placeholder="请选择项目负责人"
          filterable
          clearable
        >
          <el-option
            v-for="item in listPeo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <template #footer>
        <el-button @click="allocationVisible = false">取消</el-button>
        <el-button type="primary" @click="allocation()"> 确定 </el-button>
      </template>
    </el-dialog>
    <el-dialog
      v-model="updateVisible"
      title="申请修改任务节点(提交上一节点人审批)"
      width="30%"
      append-to-body
    >
      <el-form ref="selectRowRef" :model="selectRow.data" status-icon>
        <el-form-item label="项目名称" prop="nodeName">
          <el-input v-model="selectRow.data.nodeName" />
        </el-form-item>
        <el-form-item label="项目负责部门" prop="nodeTaskExecutorDeptId">
          <el-select
            v-model="selectRow.data.nodeTaskExecutorDeptId"
            @change="changeProDeptUpdate"
            clearable
            filterable
            placeholder="请选择部门"
          >
            <el-option
              v-for="item in listDept"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目负责人" prop="nodeTaskExecutorId">
          <el-select
            v-model="selectRow.data.nodeTaskExecutorId"
            placeholder="请选择项目负责人"
            @change="changeProPeoUpdate"
            clearable
            filterable
          >
            <el-option
              v-for="item in listPeo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目开始时间">
          <el-col :span="11">
            <el-form-item prop="nodeStartTime">
              <el-date-picker
                v-model="selectRow.data.nodeStartTime"
                type="date"
                placeholder="项目开始时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="项目结束时间">
          <el-col :span="11">
            <el-form-item prop="nodeEndTime">
              <el-date-picker
                v-model="selectRow.data.nodeEndTime"
                type="date"
                placeholder="项目结束时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="预警时间（天）" prop="earlyWarningDate">
          <el-input v-model="selectRow.data.earlyWarningDate" />
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="selectRow.data.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="updateVisible = false">取消</el-button>
        <el-button type="primary" @click="submitExamine"> 确定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import mindItem from "./components/mindItem.vue";
import itemDetail from "./components/itemDetail.vue";
import { expendfn } from "./components/index.js";
import { defineComponent, getCurrentInstance, ref } from "vue";
import { ElMessageBox, ElMessage, genFileId } from "element-plus";
import { get, post, postForm } from "@/awsuiAxios/index.js";
import { formData, notNull, timeIsBefore, getParameters } from "@/utils/index";
import { GetSettingParam } from "@/common/index.js";
import { Search } from "@element-plus/icons-vue";
import mySwitch from "@/myComponents/switch.vue"; //这里引入上一个文件（目录自己定）
import isDev from "@/config/index.js";
let settingParam = isDev
  ? {
      userName: "管理员",
    }
  : GetSettingParam();
export default defineComponent({
  name: "",
  props: {},
  components: { mindItem, itemDetail, mySwitch },
  data() {
    return {
      isNotExpandAfter: true,
      mindLoading: false,
      list: [],
      initList: [],
      num: 1,
      parentRow: {},
      Search: Search,
      newDialog: false,
      detailDialog: false,
      listPeo: [],
      projectForm: {
        rootNodeId: "",
        nodeEndTime: null,
        nodeName: null,
        nodeStartTime: null,
        nodeTaskExecutorDept: null,
        nodeTaskExecutorDeptId: null,
        nodeTaskExecutorId: null,
        nodeTaskExecutorName: null,
        nodeWeight: null,
        parentId: null,
        parentName: null,
        description: null,
        isLeaf: false,
        earlyWarningDate: 10,
      },
      selectRow: null,
      rules: {
        nodeName: [
          { required: true, message: "请输入项目名", trigger: "blur" },
        ],
        nodeTaskExecutorDeptId: [
          { required: true, message: "请选择项目负责部门", trigger: "blur" },
        ],
        nodeTaskExecutorId: [
          { required: true, message: "请选择项目负责人", trigger: "blur" },
        ],
        nodeStartTime: [
          { required: true, message: "请选择项目开始时间", trigger: "blur" },
        ],
        nodeEndTime: [
          { required: true, message: "请选择结束项目时间", trigger: "blur" },
        ],
      },
      annualList: [],
      searchOptions: [
        { value: "nodeTaskExecutorName", label: "负责人" },
        { value: "nodeTaskExecutorDept", label: "负责部门" },
      ],
      searchSelectValue: "nodeTaskExecutorName",
      searchValue: settingParam.userName,
      initSearchValue: settingParam.userName,
    };
  },
  setup(props) {
    const instance = getCurrentInstance();
    const bindingVisible = ref(false);
    const allocationVisible = ref(false);
    const updateVisible = ref(false);
    const allocationPeople = ref({
      nodeTaskExecutorDeptId: "",
      nodeTaskExecutorId: "",
    });
    const exportTask = ref(null);
    const exportButton = ref(null);
    const bindAnnual = () => {
      post({
        url: "/jd",
        data: {
          cmd: "com.awspaas.user.apps.task_management.addNodeAnnual.post",
          data: instance.data.selectRow.data,
          permissions: {
            nodeId: instance.data.selectRow.data.id,
            annualId: null,
            indexId: null,
          },
        },
      }).then((res) => {
        if (res.result == "ok") {
          ElMessage.success("绑定成功");
          bindingVisible.value = false;
          instance.ctx.init();
        }
      });
    };
    const openBinding = (item) => {
      bindingVisible.value = true;
      instance.data.selectRow = item;
      instance.ctx.getBindAnnualList();
    };
    const openUpdate = (item) => {
      updateVisible.value = true;
      instance.data.selectRow = item;
      instance.ctx.getPeo(item.data.nodeTaskExecutorDeptId);
    };
    const openAllocation = (item) => {
      allocationVisible.value = true;
      instance.data.selectRow = item;
      allocationPeople.value.nodeTaskExecutorDeptId =
        item.data.nodeTaskExecutorDeptId;
      changeProDeptUpdate(item.data.nodeTaskExecutorDeptId);
      // instance.ctx.getPeo(item.data.nodeTaskExecutorDeptId);
    };
    const changeProDeptUpdate = (val) => {
      instance.ctx.getPeo(val);
      for (let i = 0; i < instance.ctx.listDept.length; i++) {
        if (instance.ctx.listDept[i].value == val) {
          instance.data.selectRow.data.nodeTaskExecutorDept =
            instance.ctx.listDept[i].label;
          return;
        }
      }
    };
    const changeProPeoUpdate = (val) => {
      let listPeo = instance.data.listPeo;
      for (let i = 0; i < listPeo.length; i++) {
        if (listPeo[i].value == val) {
          instance.data.selectRow.data.nodeTaskExecutorName = listPeo[i].label;
          return;
        }
      }
    };
    const submitExamine = () => {
      if (
        timeIsBefore(
          instance.data.selectRow.data.nodeEndTime,
          instance.data.selectRow.data.nodeStartTime
        )
      ) {
        return ElMessage.info("结束时间不能大于开始时间！");
      }
      post({
        url: "/jd",
        data: {
          cmd: "com.awspaas.user.apps.task_management.startProcess.post",
          info: instance.data.selectRow.data,
        },
      }).then((res) => {
        if (res.result == "ok") {
          ElMessage.success("申请成功！");
          updateVisible.value = false;
        }
      });
    };
    const allocation = () => {
      post({
        url: "/jd",
        data: {
          cmd: "com.awspaas.user.apps.task_management.addAuthorizedUser.post",
          data: {
            nodeId: instance.data.selectRow.data.id,
            authorizedUserId: allocationPeople.value.nodeTaskExecutorId,
          },
        },
      }).then((res) => {
        if (res.result == "ok") {
          ElMessage.success("绑定成功！");
          allocationVisible.value = false;
        }
      });
    };
    const handleExceed = (files) => {
      exportTask.value.clearFiles();
      const file = files[0];
      file.uid = genFileId();
      exportTask.value.handleStart(file);
    };
    const clickExport = (item) => {
      instance.data.selectRow = item;
      exportButton.value.click();
    };
    const fileChange = (obj) => {
      postForm({
        data: formData({ file: obj.raw }),
      })
        .then((res) => {
          if (res.data.result == "ok") {
            return Promise.resolve(res);
          }
        })
        .then((res) => {
          post({
            url: "/jd",
            data: {
              cmd: "com.awspaas.user.apps.task_management.importFileRoot.post",
              data: {
                parentNodeId: instance.data.selectRow.data.id,
                parentName: instance.data.selectRow.data.nodeName,
                rootNodeId: instance.data.parentRow.id,
                fileName: res.data.data.attrs.fileName,
                ...getParameters(res.data.data.attrs.url),
              },
            },
            isLoading: true,
          }).then((res) => {
            if (res.result == "ok") {
              ElMessage.success("导入成功！");
              instance.ctx.init();
            }
          });
        });
    };
    return {
      bindingVisible,
      bindAnnual,
      openBinding,
      updateVisible,
      submitExamine,
      openUpdate,
      changeProDeptUpdate,
      changeProPeoUpdate,
      allocationVisible,
      openAllocation,
      allocationPeople,
      allocation,
      exportTask,
      handleExceed,
      clickExport,
      exportButton,
      fileChange,
    };
  },
  computed: {
    listDept() {
      return this.$store.state.Dept;
    },
  },
  watch: {
    // num(newVal, oldVal) {
    //   if (newVal < oldVal && oldVal <= 0.5) {
    //     this.num = 0.5;
    //   }
    // },
  },
  directives: {
    drag: {
      mounted(el) {
        let odiv = el;
        let moveing = false;
        let moves = false;
        odiv.onmousedown = (e) => {
          let arr = Array.from(odiv.classList);
          odiv.style.cursor = "move";
          // if (!arr.includes("mindRank")) return;
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = (e) => {
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            if (top <= 80 && left <= 300) {
              // top = 80;
              // left = 300;
            }
            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
            moveing = true;
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            moveing = false;
            odiv.style.cursor = "default";
          };
        };
      },
    },
  },
  created() {},
  mounted() {
    // let that = this;
    // let file = document.getElementById("file");
    // file.onchange = function () {
    //   let FileObj = this.files[0];
    //   that.getByteArray(FileObj).then((dataByte) => {
    //     // return Promise.resolve(dataByte);
    //     console.log(dataByte);
    //     post({
    //       url: "/jd",
    //       data: {
    //         cmd: "com.awspaas.user.apps.task_management.importFileRoot.post",
    //         dataByte: Object.values(dataByte),
    //       },
    //     }).then((res) => {
    //       if (res.result == "ok") {
    //         console.log("上传成功");
    //       }
    //     });
    //   });
    // };

    this.init().then(() => {
      this.$store.dispatch("getDept");
    });
    this.mouseScroll();
  },
  methods: {
    closeDetailDialog() {
      this.detailDialog = false;
    },
    back() {
      window.history.back();
    },
    clearBorder() {
      function clear(array) {
        return array.map((item) => {
          item.select = false;
          if (item.children) {
            item.children = clear(item.children);
          }
          return item;
        });
      }
      this.list = clear(this.list);
    },
    closeDialog() {
      this.newDialog = false;
    },
    openNewDialog(item) {
      this.newDialog = true;
      this.selectRow = item;
      this.projectForm.parentId = item.data.id;
      this.projectForm.parentName = item.data.nodeName;
    },
    openDetailDialog(item) {
      this.selectRow = item;
      this.getAnnualList();
    },
    getAnnualList() {
      post({
        url: "/jd",
        data: {
          cmd: "com.awspaas.user.apps.task_management.getAnnual.post",
          row: this.selectRow.data,
          permissions: {
            nodeId: this.selectRow.data.id,
            annualId: null,
            indexId: null,
          },
        },
      }).then((res) => {
        if (res.result == "ok") {
          this.annualList = {
            ...res.data,
            bindAnnualId: this.selectRow.data.bindAnnualId,
          };
          this.detailDialog = true;
        }
      });
    },
    getBindAnnualList() {
      post({
        url: "/jd",
        data: {
          cmd: "com.awspaas.user.apps.task_management.getAnnual.post",
          row: this.selectRow.data,
          permissions: {
            nodeId: this.selectRow.data.id,
            annualId: null,
            indexId: null,
          },
        },
      }).then((res) => {
        if (res.result == "ok") {
          this.annualList = {
            ...res.data,
            bindAnnualId: this.selectRow.data.bindAnnualId,
          };
        }
      });
    },
    getPeo(val) {
      get({
        url: "/jd",
        data: {
          cmd: "com.awspaas.user.apps.dt.task_management.getTeacherByDepartmentId",
          departmentId: val,
        },
      }).then((res) => {
        if (res.result == "ok") {
          this.listPeo = res.data.result;
        } else {
        }
      });
    },
    changeProDept(val) {
      let { listDept, getPeo } = this;
      getPeo(val);
      for (let i = 0; i < listDept.length; i++) {
        if (listDept[i].value == val) {
          this.projectForm.nodeTaskExecutorDept = listDept[i].label;
          return;
        }
      }
    },
    changeProPeo(val) {
      let { listPeo } = this;
      for (let i = 0; i < listPeo.length; i++) {
        if (listPeo[i].value == val) {
          this.projectForm.nodeTaskExecutorName = listPeo[i].label;
          return;
        }
      }
    },
    async addProject() {
      let that = this;
      let formEl = this.$refs.projectFormRef;
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          if (
            timeIsBefore(
              that.projectForm.nodeEndTime,
              that.projectForm.nodeStartTime
            )
          ) {
            return ElMessage.info("结束时间不能大于开始时间！");
          }
          post({
            url: "/jd",
            data: {
              cmd: "com.awspaas.user.apps.task_management.addTaskTree.post",
              projectObj: this.projectForm,
            },
          }).then((res) => {
            if (res.result == "ok") {
              this.newDialog = false;
              this.resetForm();
              ElMessage.success("新建成功");
              this.init();
            } else {
            }
          });
        }
      });
    },
    resetForm() {
      this.$refs.projectFormRef.resetFields();
    },
    init() {
      this.mindLoading = true;
      return post({
        url: "/jd",
        data: {
          cmd: "com.awspaas.user.apps.task_management.getTaskTreeChild.post",
          fId: this.$route.query.projectId,
        },
      }).then((res) => {
        if (res.result == "ok") {
          this.initList = this.addFiles(res.data.list, false);
          // this.list = this.mapTree(
          //   this.searchValue,
          //   this.initList,
          //   this.searchSelectValue
          // );
          // console.log(this.initList);
          this.list = this.addFiles(res.data.list, this.isNotExpandAfter);
          // console.log(this.list);
          // this.traverseList(this.list);
          this.mindLoading = false;
          if (this.list.length > 0) {
            this.parentRow = this.list[0].data;
            this.projectForm.rootNodeId = this.parentRow.id;
          }
        }
        return Promise.resolve();
      });
    },
    searchInit() {
      if (this.searchValue) {
        this.list = this.mapTree(
          this.searchValue,
          this.initList,
          this.searchSelectValue
        );
        // this.traverseList(this.list);
      } else {
        this.list = this.initList;
        console.log(this.list, 9090);
        // this.traverseList(this.list);
      }
    },
    expendAll() {
      this.list = this.addFiles(this.list, !this.isNotExpandAfter);
      this.isNotExpandAfter = !this.isNotExpandAfter;
    },
    handleClose(done) {
      done();
      this.resetForm();
    },
    mouseScroll() {
      let that = this;
      // 为父元素绑定滚轮监听事件
      document.getElementById("mindMap").onmousewheel = (event) => {
        var dir = event.deltaY > 0 ? "Up" : "Down";
        if (dir == "Up") {
          // console.log("向上滑动");
          that.num = that.num + 0.05;
        } else {
          // console.log("向下滑动");
          that.num = that.num - 0.05;
        }
        return false;
      };
    },
    getProgress(list) {
      let sum = 0;
      list.forEach((item) => {
        if (!notNull(item.data.annualProgress)) {
          item.data.annualProgress = 0;
        }
        sum = parseFloat(item.data.annualProgress) + sum;
      });
      return sum;
    },
    traverseList(list) {
      let newList = list.map((item) => {
        // if (!item.child) {
        //   return;
        // }
        if (item.children) {
          this.traverseList(item.children);
          item.data.annualProgress = (
            this.getProgress(item.children) / item.children.length
          ).toFixed(2);
        }
        if (!notNull(item.data.annualProgress)) {
          item.data.annualProgress = 0;
        }
        return item;
      });
      return newList;
    },
    addFiles(list, flag) {
      let newList = JSON.parse(JSON.stringify(list)).map((item) => {
        if (item.children) {
          item.children = this.addFiles(item.children, flag);
        }
        item.isExpandAfter = flag;
        return item;
      });
      return newList;
    },
    mapTree(value, arr, key) {
      let newarr = [];
      arr.forEach((element) => {
        if (element.data[key].indexOf(value) > -1) {
          // 判断条件
          newarr.push(element);
        } else {
          if (element.children && element.children.length > 0) {
            let redata = this.mapTree(value, element.children, key);
            if (redata && redata.length > 0) {
              let obj = {
                ...element,
                children: redata,
              };
              newarr.push(obj);
            }
          }
        }
      });
      return newarr;
    },
    searchValueChange() {
      this.searchInit();
    },
  },
});
</script>

<style scoped lang="less">
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.warp {
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
}
.mind {
  width: 100%;
  // margin: 40px;
  // height: calc(100vh - 80px);
  //height: 680px;
  height: 100vh;
  // width: calc(100vw - 60px);
  // position: fixed;
  user-select: none;
  background-color: #fff;
}
.mindRank {
  // cursor: move;
}
.header {
  display: inline-block;
  align-items: center;
  position: fixed;
  z-index: 2;
  background-color: #fff;
  & > div {
    display: inline-block;
    margin-right: 20px;
  }
}
</style>
