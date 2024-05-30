<template>
  <div>
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
            <a-tooltip placement="topLeft" color="#108ee9">
              <template #title>    {{ record.taskDescription }}</template>
              {{ record.taskDescription }}
            </a-tooltip>
          </template>
          <template v-if="column.key === 'action'">
            <a style="color: blue" @click="handleClick(record)">查看</a>
          </template>
        </template>
      </a-table>
      <!--  查看的dialog-->
      <a-modal v-model:open="open" title="办理" @ok="handleOk3" :width="800">
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
            <a-form-item label="责任部门">
              <a-input disabled v-model:value="reviewFormState.assessmentDepartmentName" />
            </a-form-item>
            <a-form-item label="任务下发时间">
              <a-input disabled v-model:value="reviewFormState.startTime" />
            </a-form-item>
            <a-divider></a-divider>
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
import {nextTick, onMounted, ref} from "vue";
import {getDoneTaskList} from "@/api/alreadyDone";
import {getTaskInfo} from "@/api/workprogress";
import PersonInfo from "@/components/getPersonInfo/personInfo.vue";
import {exportFile, getFilterList} from "@/api/user";
import {getFocus} from "../api/focus";
import {getFilterList1} from "../api/user";
const open=ref(false)
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
const data=ref([])
const loading=ref(false)
onMounted(()=>{
  loading.value=true
  getFocus().then(res=>{
    if (res.result=='ok'){
      data.value=res.data
      filterList.value=getFilterList(data.value)
      filterList1.value=getFilterList1(data.value)
    }
  }).finally(()=>{
    loading.value=false
  })
})
const reviewFormState=ref({
  taskCode:null,
  projectName:null,
  taskName:null,
  taskDescription:null,
  assessmentDepartmentName:null,
  startTime:null,
})
const forFeedBackList=ref([])
//任务总分，任务自评分和审核得分都不能超过这个
const taskScore=ref()
const handleClick=(record)=>{
  getTaskInfo(record.taskCode).then(res=>{
    if (res.result=='ok'){
      forFeedBackList.value=res.data.feedBackList
      reviewFormState.value.projectName=res.data.task.projectName
      reviewFormState.value.taskName=res.data.task.taskName
      reviewFormState.value.taskDescription=res.data.task.taskDescription
      reviewFormState.value.assessmentDepartmentName=res.data.task.assessmentDepartmentName
      reviewFormState.value.startTime=res.data.task.startTime
      reviewFormState.value.endTime=res.data.task.endTime
      reviewFormState.value.personResponsibleName=res.data.task.personResponsibleName
      reviewFormState.value.personResponsible=record.personResponsible
      reviewFormState.value.assessmentMethod=res.data.task.assessmentMethod
      reviewFormState.value.taskType=res.data.task.taskType
      reviewFormState.value.targetName=res.data.task.targetName
      reviewFormState.value.taskType=res.data.task.taskType
      reviewFormState.value.targetDescription=record.targetDescription
      reviewFormState.value.responsibleDepartmentName=res.data.task.responsibleDepartmentName
      taskScore.value=res.data.task.score
      open.value=true
    }
  })
}
const userId=ref()
const personRef=ref()
const handleGetInfo=(uid)=>{
  userId.value=uid
  nextTick(()=>{
    personRef.value.openModel()
  })
}
const handleOk3=()=>{
  open.value=false
}
const handleDown=(item)=>{
  let link =`${import.meta.env.VITE_APP_BASE_API}/portal/r${item.url.replace('.','')}&sid=${localStorage.getItem('sid')}`
  exportFile(link,item.name)
}
</script>
<style scoped>

</style>