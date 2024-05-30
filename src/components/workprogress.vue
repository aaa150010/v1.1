<template>
<div style="max-height: 100vh;overflow:scroll;">
  <a-card  :bordered="false" >
    <a-table :columns="columns" :data-source="data" :pagination="false" :loading="loading">
<!--      <template #headerCell="{ column }">-->
<!--        <template v-if="column.key === 'name'">-->
<!--        <span>-->
<!--          <smile-outlined />-->
<!--          Name-->
<!--        </span>-->
<!--        </template>-->
<!--      </template>-->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'taskName'">
          <a-tooltip placement="topLeft" color="#108ee9">
            <template #title>    {{ record.taskName }}</template>
              {{ record.taskName }}
          </a-tooltip>
        </template>
        <template v-if="column.key === 'taskDescription'">
          {{ record.taskDescription==''?record.targetDescription:record.taskDescription }}
        </template>
        <template v-if="column.key === 'action'">
         <a style="color: blue" @click="handleClick(record)" v-if="record.unCompleteChildren==0">办理</a>
        </template>
      </template>
    </a-table>
  </a-card>
<!--  未完成打开的提交dialog-->
  <a-modal v-model:open="open1" title="办理" @ok="handleOk1" :width="800" :maskClosable="false">
    <div style="height: 600px;overflow: scroll">
      <a-form :model="addFormState" ref="addFormRef" :rules="rules">
        <a-form-item label="项目名称">
          <a-input disabled v-model:value="addFormState.projectName" />
        </a-form-item>
        <a-form-item label="任务名称">
          <a-input disabled v-model:value="addFormState.taskName" />
        </a-form-item>
        <a-row>
          <a-col :span="12">
            <a-form-item label="责任部门">
              <a-input
                  v-model:value="addFormState.responsibleDepartmentName"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="责任人">
              <a style="color: blue" @click="handleGetInfo(addFormState.personResponsible)">
                {{addFormState.personResponsibleName}}
              </a>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="任务开始时间">
              <a-input
                  v-model:value="addFormState.startTime"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="任务截止时间">
              <a-input
                  v-model:value="addFormState.endTime"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="考核方式">
              <a-input
                  v-model:value="addFormState.assessmentMethod"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="任务类型">
              <a-input
                  v-model:value="addFormState.taskType"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="任务分数">
          <a-input disabled v-model:value="taskScore" />
        </a-form-item>
        <a-form-item label="任务说明" v-if="addFormState.taskType=='分发任务'">
          <a-textarea disabled v-model:value="addFormState.taskDescription" />
        </a-form-item>
        <template v-else>
          <a-form-item label="量化指标名称">
            <a-input disabled v-model:value="addFormState.targetName" />
          </a-form-item>
          <a-form-item label="量化指标说明">
            <a-input disabled v-model:value="addFormState.targetDescription" />
          </a-form-item>
        </template>
        <a-form-item label="进度反馈" name="progressFeedback">
          <a-textarea  v-model:value="addFormState.progressFeedback" />
        </a-form-item>
        <a-form-item label="任务进度" name="taskSchedule">
          <a-input-number
              v-model:value="addFormState.taskSchedule"
              :min="0"
              :max="100"
              :formatter="value => `${value}%`"
              style="width: 100%"
              :parser="value => value.replace('%', '')"
          />
        </a-form-item>
        <a-form-item label="任务自评分" name="selfScore" >
          <div style="display: flex;width: 100%;justify-content: space-between">
            <div style="width: 70%">
              <a-slider v-model:value="addFormState.selfScore"  :max="taskScore" :step="0.1"/>
            </div>
            <div style="width: 30%;margin-left: 10px">
              <a-input-number v-model:value="addFormState.selfScore"  :max="taskScore" />
            </div>
          </div>
        </a-form-item>
        <a-form-item label="量化指标数值" name="targetValue1" v-if="addFormState.taskType=='指标任务'&&addFormState.targetType=='数字'">
          <div style="display: flex;width: 100%;justify-content: space-between">
<!--            任务为指标任务，且任务类型为数字-->
            <div style="width: 70%">
              <a-slider v-model:value="addFormState.targetValue1" :max="addFormState.maxValue" :step="0.1"/>
            </div>
            <div style="width: 30%;margin-left: 10px">
              <a-input-number v-model:value="addFormState.targetValue1" :max="addFormState.targetValue"/>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="量化指标数值" name="targetValue2" v-if="addFormState.taskType=='指标任务'&&addFormState.targetType=='字母'">
          <!--          任务为指标任务，且任务类型为字母-->
            <a-input v-model:value="addFormState.targetValue2" placeholder="请填写量化指标数值A-Z"></a-input>
        </a-form-item>
        <div>
          <div style="display: flex;justify-content: space-between">
            <div>佐证材料</div>
            <a-button type="link" @click="handleClickAddFile">新增</a-button>
          </div>
          <div style="display: flex;justify-content: space-between;margin-top: 10px">
            <div>
              当前选中的文件：
            </div>
          </div>
          <div class="fieldItem" v-for="item in valueObjList" :key="item" style="display: flex;justify-content: space-between;">
            <div style="color: blue" class="underBox" @click="handleDown(item)">{{item.label}}</div>
            <div>
              <a style="margin-left: 20px" @click="handleDown(item)">查看</a>
              <a style="margin-left: 20px" @click="updataFile">修改</a>
              <a style="margin-left: 20px" @click="deleteFile(item.value)">删除</a>
            </div>
          </div>
        </div>
        <a-divider></a-divider>
        <template v-for="item in forFeedBackList" :key="item">
          <!--        审核  根据result字段判断是否渲染-->
          <div style="border: 2px solid rgba(240, 240, 240);padding: 8px;margin-bottom: 10px" v-if="item.review.auditResult!==''">
            <div style="font-size: 18px;text-align: center">审核</div>
            <div class="fieldItem">
              <span>审核部门：{{item.review.auditDepartmentName}}</span>
            </div>
            <div class="fieldItem">
              <a style="color: blue" @click="handleGetInfo(item.review.auditPerson)">审核人：{{item.review.auditPersonName}}</a>
            </div>
            <div class="fieldItem">
              <span>审核时间：{{item.review.auditTime}}</span>
            </div>
            <div class="fieldItem">
              <span>审核意见：{{item.review.reviewComments}}</span>
            </div>
            <div class="fieldItem">
              <span>审核得分：{{item.review.auditScore}}</span>
            </div>
          </div>
          <!--        反馈-->
          <div style="border: 2px solid rgba(240, 240, 240);padding: 8px;margin-bottom: 10px">
            <div style="font-size: 18px;text-align: center">反馈</div>
            <div class="fieldItem">
              <span>反馈部门：{{item.feedBack.feedBackDepartmentName}}</span>
            </div>
            <div class="fieldItem">
              <a style="color: blue" @click="handleGetInfo(item.feedBack.feedBackPerson)">反馈人：{{item.feedBack.feedBackPersonName}}</a>
            </div>
            <div class="fieldItem">
              <span>任务反馈时间：{{item.feedBack.feedBackTime}}</span>
            </div>
            <div class="fieldItem">
              <span>任务进度：{{item.feedBack.taskSchedule}}%</span>
            </div>
            <div class="fieldItem">
              <span>进度反馈：{{item.feedBack.progressFeedBack}}</span>
            </div>
            <div class="fieldItem">
              <span>自评分：{{item.feedBack.feedBackSelfScore}}</span>
            </div>
            <div>
              <div>佐证材料</div>
              <div v-for="item1 in item.feedBack.feedBackAttachment" style="margin: 10px;">
                <a style="color: blue" class="underBox" @click="handleDown(item1)">{{item1.name}}</a>
                <a style="margin-left: 30px" @click="handleDown(item1)">查看</a>
              </div>
            </div>
          </div>
        </template>
      </a-form>
    </div>
  </a-modal>
<!--  新增文件的modal-->
  <a-modal v-model:open="open2" title="选择文件" @ok="handleOk2" :width="800" :maskClosable="false">
    <a-tabs v-model:activeKey="activeKey" @change="handleChange">
      <a-tab-pane key="1" tab="本地上传">
        <localupload></localupload>
      </a-tab-pane>
      <a-tab-pane key="2" tab="数据湖" force-render>
        <a-tree-select
            v-model:value="value"
            v-model:searchValue="searchValue"
            show-search
            style="width: 100%"
            placeholder="请选择文件"
            tree-checkable
            allow-clear
            tree-default-expand-all
            :tree-data="treeData"
            tree-node-filter-prop="label"
        >
        </a-tree-select>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
<!--  审核的dialog-->
  <a-modal v-model:open="open3" title="办理" @ok="handleOk3" :width="800">
    <div style="height: 600px;overflow: scroll">
      <a-form :model="reviewFormState" ref="reviewFormStateRef" :rules="rules2">
        <a-form-item label="项目名称">
          <a-input disabled v-model:value="reviewFormState.projectName" />
        </a-form-item>
        <a-form-item label="任务名称">
          <a-input disabled v-model:value="reviewFormState.taskName" />
        </a-form-item>
        <a-row>
          <a-col :span="12">
            <a-form-item label="责任部门">
              <a-input
                  v-model:value="reviewFormState.responsibleDepartmentName"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="责任人">
              <a style="color: blue" @click="handleGetInfo(reviewFormState.personResponsible)">
                {{reviewFormState.personResponsibleName}}
              </a>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="任务开始时间">
              <a-input
                  v-model:value="reviewFormState.startTime"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="任务截止时间">
              <a-input
                  v-model:value="reviewFormState.endTime"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="考核方式">
              <a-input
                  v-model:value="reviewFormState.assessmentMethod"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="任务类型">
              <a-input
                  v-model:value="reviewFormState.taskType"
                  disabled
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="任务分数">
          <a-input disabled v-model:value="taskScore" />
        </a-form-item>
        <a-form-item label="任务说明" v-if="reviewFormState.taskType=='分发任务'">
          <a-textarea disabled v-model:value="reviewFormState.taskDescription" />
        </a-form-item>
        <template v-else>
          <a-form-item label="量化指标名称">
            <a-input disabled v-model:value="reviewFormState.targetName" />
          </a-form-item>
          <a-form-item label="量化指标说明">
            <a-input disabled v-model:value="reviewFormState.targetDescription" />
          </a-form-item>
        </template>
        <a-form-item label="审核部门">
          <a-input disabled v-model:value="reviewFormState.assessmentDepartmentName" />
        </a-form-item>
        <a-form-item label="任务下发时间">
          <a-input disabled v-model:value="reviewFormState.startTime" />
        </a-form-item>
        <a-divider></a-divider>
        <a-form-item label="审核结果" name="auditResult">
          <a-radio-group v-model:value="reviewFormState.auditResult" name="radioGroup">
            <a-radio value="通过">通过</a-radio>
            <a-radio value="驳回">驳回</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="审核意见" name="reviewComments">
          <a-textarea placeholder="请输入审核意见" style="height: 80px" v-model:value="reviewFormState.reviewComments" />
        </a-form-item>
        <a-form-item label="审核得分" name="auditScore"  v-if="reviewFormState.auditResult=='通过'||reviewFormState.auditResult==null">
          <div style="display: flex;width: 100%;justify-content: space-between">
            <div style="width: 70%">
              <a-slider v-model:value="reviewFormState.auditScore"  :max="taskScore" :step="0.1"/>
            </div>
            <div style="width: 30%;margin-left: 10px">
              <a-input-number v-model:value="reviewFormState.auditScore"  :max="taskScore" />
            </div>
          </div>
        </a-form-item>
        <a-divider></a-divider>
        <template v-for="item in forFeedBackList" :key="item">
          <!--        审核  根据result字段判断是否渲染-->
          <div style="border: 2px solid rgba(240, 240, 240);padding: 8px;margin-bottom: 10px" v-if="item.review.auditResult!==''">
            <div style="font-size: 18px;text-align: center">审核</div>
            <div class="fieldItem">
              <span>审核部门：{{item.review.auditDepartmentName}}</span>
            </div>
            <div class="fieldItem">
              <a style="color: blue" @click="handleGetInfo(item.review.auditPerson)">审核人：{{item.review.auditPersonName}}</a>
            </div>
            <div class="fieldItem">
              <span>审核时间：{{item.review.auditTime}}</span>
            </div>
            <div class="fieldItem">
              <span>审核意见：{{item.review.reviewComments}}</span>
            </div>
            <div class="fieldItem">
              <span>审核得分：{{item.review.auditScore}}</span>
            </div>
          </div>
          <!--        反馈-->
          <div style="border: 2px solid rgba(240, 240, 240);padding: 8px;margin-bottom: 10px">
            <div style="font-size: 18px;text-align: center">反馈</div>
            <div class="fieldItem">
              <span>反馈部门：{{item.feedBack.feedBackDepartmentName}}</span>
            </div>
            <div class="fieldItem">
              <a style="color: blue" @click="handleGetInfo(item.feedBack.feedBackPerson)">反馈人：{{item.feedBack.feedBackPersonName}}</a>
            </div>
            <div class="fieldItem">
              <span>任务反馈时间：{{item.feedBack.feedBackTime}}</span>
            </div>
            <div class="fieldItem">
              <span>任务进度：{{item.feedBack.taskSchedule}}%</span>
            </div>
            <div class="fieldItem">
              <span>进度反馈：{{item.feedBack.progressFeedBack}}</span>
            </div>
            <div class="fieldItem">
              <span>自评分：{{item.feedBack.feedBackSelfScore}}</span>
            </div>
            <div>
              <div>佐证材料</div>
              <div v-for="item1 in item.feedBack.feedBackAttachment" style="margin: 10px;">
                <a style="color: blue" class="underBox" @click="handleDown(item1)">{{item1.name}}</a>
                <a style="margin-left: 30px" @click="handleDown(item1)">查看</a>
              </div>
            </div>
          </div>
        </template>
      </a-form>
    </div>
  </a-modal>
<!--  查询个人信息model-->
  <person-info :user-id="userId" ref="personRef"></person-info>
</div>
</template>
<script setup>
import {nextTick, onMounted, ref, watch} from "vue";
import download from 'downloadjs'
import {addFeedback, addReviewMessage, getAllResource, getTaskInfo, getTodoTaskList} from "@/api/workprogress";
import { SmileOutlined} from '@ant-design/icons-vue';
import Localupload from "@/components/localupload.vue";
import {message} from "ant-design-vue";
import PersonInfo from "@/components/getPersonInfo/personInfo.vue";
import {exportFile, getFilterList} from "@/api/user";
import {getFilterList1} from "../api/user";
const activeKey = ref('1');
const loading=ref(false)
const open1 =ref(false)
const open2 =ref(false)
const open3=ref(false)
const data=ref([])
const filterList=ref([])
const filterList1=ref([])
const columns = ref([
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
    filters: filterList,
    onFilter: (value, record) => record.projectName == value,
    width:150,
    ellipsis: true,
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
    width:150,
    ellipsis: true,
  },
  {
    title: '任务说明',
    key: 'targetDescription',
    dataIndex: 'targetDescription',
    width:200,
    ellipsis: true,
  },
  {
    title: '未完成子任务数',
    key: 'unCompleteChildren',
    dataIndex: 'unCompleteChildren',
    width:150,
    ellipsis: true,
  },
  {
    title: '发布人',
    key: 'taskPublisherName',
    dataIndex: 'taskPublisherName',
    width:100,
    ellipsis: true,
  },
  {
    title: '考核方式',
    key: 'assessmentMethod',
    dataIndex: 'assessmentMethod',
    width:100,
    ellipsis: true,
  },
  {
    title: '责任部门',
    key: 'responsibleDepartmentName',
    dataIndex: 'responsibleDepartmentName',
    width:150,
    ellipsis: true,
  },
  {
    title: '考核部门',
    key: 'assessmentDepartmentName',
    dataIndex: 'assessmentDepartmentName',
    width:150,
    ellipsis: true,
  },
  {
    title: '任务下发时间',
    key: 'startTime',
    dataIndex: 'startTime',
    width:150,
    ellipsis: true,
  },
  {
    title: '任务截止时间',
    key: 'endTime',
    dataIndex: 'endTime',
    width:150,
    ellipsis: true,
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    filters: filterList1,
    onFilter: (value, record) => record.status == value,
    width:100,
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    width:80,
    ellipsis: true,
    fixed: 'right',
  },
]);
//新增的form
const addFormRef=ref()
const reviewFormStateRef=ref()
const addFormState=ref({
  projectName:null,
  taskName:null,
  taskDescription:null,
  // 责任部门
  responsibleDepartmentName:null,
  // 责任人
  personResponsibleName:null,
  // 责任人id
  personResponsible:null,
  // 时间
  startTime:null,
  endTime:null,
  // 考核方式
  assessmentMethod:null,
  // 任务类型
  taskType:null,
})
const reviewFormState=ref({
  taskCode:null,
  projectName:null,
  taskName:null,
  taskDescription:null,
  assessmentDepartmentName:null,
  startTime:null,
  // 审核结果
  auditResult:null,
  //审核意见
  reviewComments:null,
  //审核得分
  auditScore:null,
})
const forFeedBackList=ref([])
//任务总分，任务自评分和审核得分都不能超过这个
const taskScore=ref()
const validataScore=async (_rule, value) => {
  if (value === null) {
    return Promise.reject('请输入分数');
  } else if (value > taskScore.value) {
    return Promise.reject(`分数不能大于任务分数${taskScore.value}分!`);
  }
};
const rules=ref({
  progressFeedback: [
    {
      required: true,
      message: '请输入进度反馈',
      trigger: 'blur',
    },
  ],
  selfScore: [
    {
      validator:validataScore,
      trigger: 'blue',
      required:true,
    },
  ],
  taskSchedule: [
    {
      required: true,
      message: '请输入任务进度',
      trigger: 'blur',
    },
  ],
  targetValue1:[
    {
      required: true,
      message: '请输入量化指标数值',
      trigger: 'blur',
    },
  ],
  targetValue2:[
    {
      required: true,
      message: "必填项",
      trigger: "blur",
    },
    {
      pattern: /^[A-Z]+$/,
      message: "格式不对",
      trigger: "blur",
    },
  ]
})
const rules2=ref({
  auditResult: [
    {
      required: true,
      message: '请选择审核结果',
      trigger: 'blur',
    },
  ],
  reviewComments: [
    {
      required: true,
      message: '请输入审核意见',
      trigger: 'blur',
    },
  ],
  auditScore: [
    {
      validator:validataScore,
      trigger: 'blue',
      required:true,
    },
  ],
})
onMounted(()=>{
  loading.value=true
  getTodoTaskList().then(res=>{
    if (res.result=='ok'){
      data.value=res.data
      filterList.value=getFilterList(data.value)
      filterList1.value=getFilterList1(data.value)
    }
  }).finally(()=>{
    loading.value=false
  })
})
const handleClick=(record)=>{
  console.log(record)
  // 根据状态判断打开哪个dialog
  if (record.status=='未完成'){
    addFormState.value.projectName=record.projectName
    addFormState.value.taskName=record.taskName
    addFormState.value.taskDescription=record.taskDescription
    addFormState.value.taskCode=record.taskCode
    addFormState.value.responsibleDepartmentName=record.responsibleDepartmentName
    addFormState.value.personResponsibleName=record.personResponsibleName
    addFormState.value.personResponsible=record.personResponsible
    addFormState.value.startTime=record.startTime
    addFormState.value.endTime=record.endTime
    addFormState.value.assessmentMethod=record.assessmentMethod
    addFormState.value.taskType=record.taskType
    // 如果是分发任务显示量化值
    addFormState.value.targetName=record.targetName
    addFormState.value.targetDescription=record.taskType
    // 赋值任务类型（指标任务才有量化）
    addFormState.value.taskType=record.taskType
    // 赋值量化指标类型，根据类型判断是数字输入还是字母输入
    addFormState.value.targetType=record.targetType
    // 存放量化指标最大值
    addFormState.value.maxValue=record.targetValue1
    // 每次打开置空
    addFormState.value.selfScore=null
    addFormState.value.taskSchedule=null
    addFormState.value.progressFeedback=null
    addFormState.value.supportingMaterials=null
    addFormState.value.targetValue1=null
    addFormState.value.targetValue2=null
    value.value=[]
    searchValue.value=null
    activeKey.value='1'
    open1.value=true
    // 未完成或者未反馈的信息也得渲染以前的反馈信息
    getTaskInfo(record.taskCode).then(res=>{
      if (res.result=='ok'){
        // 赋值task的分数做校验，不允许分数大于taskScore
        taskScore.value=res.data.task.score
        forFeedBackList.value=res.data.feedBackList
      }
    })
  }else if (record.status=='审核中'){
    // 每次打开滞空
    reviewFormState.value.auditResult=null
    reviewFormState.value.reviewComments=null
    reviewFormState.value.auditScore=null
    open3.value=true
    getTaskInfo(record.taskCode).then(res=>{
      if (res.result=='ok'){
        // 赋值task的分数做校验，不允许分数大于taskScore
        taskScore.value=res.data.task.score
        reviewFormState.value.projectName=res.data.task.projectName
        reviewFormState.value.taskName=res.data.task.taskName
        reviewFormState.value.taskCode=record.taskCode
        reviewFormState.value.taskDescription=res.data.task.taskDescription
        reviewFormState.value.assessmentDepartmentName=res.data.task.assessmentDepartmentName
        reviewFormState.value.responsibleDepartmentName=res.data.task.responsibleDepartmentName
        reviewFormState.value.startTime=res.data.task.startTime
        reviewFormState.value.endTime=res.data.task.endTime
        reviewFormState.value.personResponsibleName=res.data.task.personResponsibleName
        reviewFormState.value.personResponsible=record.personResponsible
        reviewFormState.value.assessmentMethod=res.data.task.assessmentMethod
        reviewFormState.value.taskType=res.data.task.taskType
        reviewFormState.value.targetName=res.data.task.targetName
        reviewFormState.value.taskType=res.data.task.taskType
        forFeedBackList.value=res.data.feedBackList
        reviewFormState.value.targetDescription=record.targetDescription
      }
    })
  }
}
const handleClickAddFile=()=>{
  value.value=valueObjList.value.map(obj => obj.value)
  open2.value=true
}
// 树形结构绑定的值
const value = ref([]);
const treeData = ref([]);
//存放文件对象的数组
const valueObjList=ref([])
const searchValue = ref('');
//查找深层id对应的对象数组
function findObjectsByIds(objectArray, idArray) {
  const result = [];
  function traverse(objects) {
    for (const obj of objects) {
      if (idArray.includes(obj.value)) {
        result.push(obj);
      }
      if (obj.children && obj.children.length > 0) {
        traverse(obj.children);
      }
    }
  }

  traverse(objectArray);
  return result;
}

watch(value, () => {
  console.log(value.value);
 // 找到存放id的数组对应的对象数组
  console.log(treeData.value)
  valueObjList.value= findObjectsByIds(treeData.value,value.value);
});
//存放选中的文件名称
const selectFileName=ref(null)
//存放选中的文件下载地址
const selectFileUrl=ref(null)
//存放选中的文件code-->  addFormState.supportingMaterials

//深层遍历添加无法选中
function traverseAndSetDisabled(data) {
  return data.map((item) => {
    if (item.type === '文件夹') {
      return {
        ...item,
        disabled: true,
        children: item.children ? traverseAndSetDisabled(item.children) : []
      };
    } else {
      return {
        ...item,
        disabled: false,
        children: item.children ? traverseAndSetDisabled(item.children) : []
      };
    }
  });
}
const handleChange=(key)=>{
  //切换到数据湖查询所有资源
  if (key=='2'){
    getAllResource().then(res=>{
      if (res.result=='ok'){
        console.log(res.data)
        treeData.value=traverseAndSetDisabled(res.data)
      }
    })
  }
}
const handleOk2=()=>{
  open2.value=false
}
const handleOk1=()=>{
    addFormRef.value.validate()
        .then(()=>{
          addFormState.value.supportingMaterials=value.value
          addFeedback(addFormState.value).then(res=>{
            if (res.result=='ok'){
              // 刷新数据
              loading.value=true
              getTodoTaskList().then(res=>{
                if (res.result=='ok'){
                  data.value=res.data
                  filterList.value=getFilterList(data.value)
                  filterList1.value=getFilterList1(data.value)
                  console.log(res.data)
                }
              }).finally(()=>{
                loading.value=false
              })
            }
          }).finally(()=>{
            open1.value=false
          })
        })
}
const downFile=()=>{
  // 如果是文件则直接下载
  let link =`${import.meta.env.VITE_APP_BASE_API}/portal/r${selectFileUrl.value.replace('.','')}&sid=${localStorage.getItem('sid')}`
  exportFile(link,selectFileName.value)
  // download(link,selectFileName.value)
}
const updataFile=()=>{
  value.value=valueObjList.value.map(obj => obj.value)
  open2.value=true
}
const deleteFile=(value)=>{
  valueObjList.value=valueObjList.value.filter(obj => obj.value !== value)
}
const handleOk3=()=>{
  reviewFormStateRef.value.validate()
      .then(()=>{
        addReviewMessage(reviewFormState.value.taskCode, reviewFormState.value.auditResult, reviewFormState.value.reviewComments, reviewFormState.value.auditScore,).finally(()=>{
          open3.value=false
          // 刷新数据
          loading.value=true
          getTodoTaskList().then(res=>{
            if (res.result=='ok'){
              data.value=res.data
              filterList.value=getFilterList(data.value)
              filterList1.value=getFilterList1(data.value)
            }
          }).finally(()=>{
            loading.value=false
          })
        })
      })
}
const handleDown=(item)=>{
  let link =`${import.meta.env.VITE_APP_BASE_API}/portal/r${item.url.replace('.','')}&sid=${localStorage.getItem('sid')}`
  exportFile(link,item.name)
  // download(link,item.name)
}
const userId=ref()
const personRef=ref()
const handleGetInfo=(uid)=>{
  userId.value=uid
  nextTick(()=>{
    personRef.value.openModel()
  })
}
</script>
<style scoped>
.fieldItem{
  height: 32px;
  margin-bottom: 24px;
}
</style>