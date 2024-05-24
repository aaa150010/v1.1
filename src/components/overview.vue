<template>
  <div>
    <a-card title="工作进度" :bordered="false"  style="margin-top: 10px">
     <div style="display: flex;justify-content: space-around">
       <div>
         <a-progress type="dashboard" :percent="workbenchObj.percent" />
       </div>
       <div class="oneItemTotal">
         <div style="width: 40px;height: 40px;text-align: center;line-height: 40px">{{workbenchObj.projectNumber}}</div>
         <div>参与的项目数</div>
       </div>
       <div class="oneItem" @click="handleItem('未完成')">
         <a-button type="link" size="large">{{ workbenchObj.unCompleteTaskNumber }}</a-button>
         <div >未完成任务数</div>
       </div>
       <div class="oneItem" @click="handleItem('审核中')">
         <a-button type="link" size="large">{{ workbenchObj.reviewTaskNumber }}</a-button>
         <div >待审核任务数</div>
       </div>
       <div class="oneItem" @click="handleItem('已完成')">
         <a-button type="link" size="large">{{ workbenchObj.completeTaskNumber }}</a-button>
         <div >已完成任务数</div>
       </div>
     </div>
    </a-card>
    <a-card title="时间预警" :bordered="false"  style="margin-top: 10px">
      <div style="display: flex;justify-content: space-around">
        <div class="oneItem" @click="handleHalf">
          <a-button type="link" size="large">{{ workbenchObj.warningTaskNumber }}</a-button>
          <div>耗时过半的任务</div>
        </div>
        <div class="oneItem" @click="handleOver">
          <a-button type="link" size="large">{{ workbenchObj.overdueTaskNumber }}</a-button>
          <div>逾期的任务</div>
        </div>
      </div>
    </a-card>
    <a-card title="我的关注" :bordered="false" style="margin-top: 10px">
      <template  v-for="(item1,index) in FollowProjectList" :key="index" v-if="FollowProjectList.length>0">
        <div style="display: flex;justify-content: space-between">
          <div class="itemTitle">
            <div class="itemDesc">{{item1.projectName}}</div>
            <div>启动时间：{{item1.startTime}}</div>
            <div>截止时间：{{item1.endTime}}</div>
          </div>
          <div class="oneItemTotal">
            <div  style="width: 40px;height: 40px;text-align: center;line-height: 40px">{{item1.totalTaskNumber}}</div>
            <div>总任务数</div>
          </div>
          <div class="oneItem"  @click="handleFavorite(item1,'未完成')">
            <a-button type="link" size="large">{{item1.unCompleteTaskNumber}}</a-button>
            <div>待完成任务数</div>
          </div>
          <div class="oneItem" @click="handleFavorite(item1,'审核中')">
            <a-button type="link" size="large">{{item1.reviewTaskNumber}}</a-button>
            <div>待审核任务数</div>
          </div>
          <div class="oneItem" @click="handleFavorite(item1,'已完成')">
            <a-button type="link" size="large">{{item1.completeTaskNumber}}</a-button>
            <div>已完成任务数</div>
          </div>
        </div>
        <a-divider  v-if="index!==FollowProjectList.length-1"/>
      </template>
      <template v-else>
        <a-empty />
      </template>
    </a-card>
<!--    未完成model-->
    <a-modal v-model:open="open1" title="未完成任务数" @cancel="handleOk1" @ok="handleOk1" :width="1200" :maskClosable="false">
      <div style="height: 600px;overflow: scroll">
        <workprogress v-if="open1"></workprogress>
      </div>
    </a-modal>
<!--    待审核和已完成model-->
    <a-modal v-model:open="open2" :title="title" @cancel="handleOk1" @ok="handleOk1" :maskClosable="false" :width="1200">
      <div style="height: 600px;overflow: scroll">
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
      </div>
    </a-modal >
<!--    待审核和已完成点击查看的dialog-->
    <!--  查看的dialog-->
    <a-modal v-model:open="open3" title="办理" @ok="handleOk3" :width="800">
      <div style="height: 600px;overflow: scroll">
        <a-form :model="reviewFormState" ref="reviewFormStateRef" :rules="rules2">
          <a-form-item label="项目名称">
            <a-input disabled v-model:value="reviewFormState.projectName" />
          </a-form-item>
          <a-form-item label="任务名称">
            <a-input disabled v-model:value="reviewFormState.taskName" />
          </a-form-item>
          <a-form-item label="任务分数">
            <a-input disabled v-model:value="taskScore" />
          </a-form-item>
          <a-form-item label="任务说明">
            <a-textarea disabled v-model:value="reviewFormState.taskDescription" />
          </a-form-item>
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
                <span>进度反馈：{{item.feedBack.progressFeedBack}}</span>
              </div>
              <div>
                <div>佐证材料</div>
                <div v-for="item1 in item.feedBack.feedBackAttachment" style="margin: 10px;">
                  <a style="color: blue">{{item1.name}}</a>
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
<!--    耗时过半-->
    <a-modal v-model:open="open4" title="耗时过半的任务" @cancel="handleOk4" :maskClosable="false" @ok="handleOk4" :width="1200">
      <div style="height: 600px;overflow: scroll">
        <half-time v-if="open4"></half-time>
      </div>
    </a-modal>
<!--    已逾期-->
    <a-modal v-model:open="open5" title="已逾期任务" @cancel="handleOk5" :maskClosable="false" @ok="handleOk5" :width="1200">
      <div style="height: 600px;overflow: scroll">
        <over-time v-if="open5"></over-time>
      </div>
    </a-modal>
<!--    关注里面的model，分为未完成|已完成|审核中-->
    <a-modal v-model:open="open6" :title="title6"@cancel="handleOk6" @ok="handleOk6" :width="1200" :maskClosable="false">
      <div style="height: 600px;overflow: scroll">
        <favorite :project-code="projectCode" :status="status" ref="favoriteRef" v-if="open6"></favorite>
      </div>
    </a-modal>
  </div>
</template>
<script setup>
import {nextTick, onMounted, ref} from "vue";
import {getFollowProjectList, getTaskInfoList, getWorkbench} from "@/api/overview";
import Workprogress from "@/components/workprogress.vue";
import {getTaskInfo} from "@/api/workprogress";
import PersonInfo from "@/components/getPersonInfo/personInfo.vue";
import HalfTime from "@/components/halfTime.vue";
import OverTime from "@/components/overTime.vue";
import Favorite from "@/components/favorite.vue";
import {exportFile} from "@/api/user";
const workbenchObj=ref({
  percent:0,
  completeTaskNumber:0,
  overdueTaskNumber:0,
  projectNumber:0,
  reviewTaskNumber:0,
  unCompleteTaskNumber:0,
  warningTaskNumber:0,
})
const FollowProjectList=ref([])
const loading=ref(false)
onMounted(()=>{
  getWorkData()
  getFollowData()
})
//获取工作台信息
const getWorkData=()=>{
  getWorkbench().then(res=>{
    if (res.result=='ok'){
      if (res.data.totalTaskNumber == 0){
        workbenchObj.value.percent=0;
      }else {
        workbenchObj.value.percent= ((res.data.completeTaskNumber/res.data.totalTaskNumber)* 100).toFixed(0)
      }

      workbenchObj.value.completeTaskNumber=res.data.completeTaskNumber
      workbenchObj.value.overdueTaskNumber=res.data.overdueTaskNumber
      workbenchObj.value.projectNumber=res.data.projectNumber
      workbenchObj.value.reviewTaskNumber=res.data.reviewTaskNumber
      workbenchObj.value.unCompleteTaskNumber=res.data.unCompleteTaskNumber
      workbenchObj.value.warningTaskNumber=res.data.warningTaskNumber
    }
  })
}
//获取关注信息
const getFollowData=()=>{
  getFollowProjectList().then(res=>{
    if (res.result=='ok'){
      FollowProjectList.value=res.data
    }
  })
}
const handleItem=(status)=>{
  console.log(status)
  if (status=='未完成'){
    // 未完成直接显示未完成组件，不需要发请求
    open1.value=true
  }else {
    if (status=='已完成'){
      title.value='已完成任务数'
    }
    // 如果是待审核和已完成才发请求
    loading.value=true
    open2.value=true
    getTaskInfoList(status,true,'').then(res=>{
      if (res.result=='ok'){
        data.value=res.data
      }
    }).finally(()=>{
      loading.value=false
    })
  }
}
const open1=ref(false)
const handleOk1=()=>{
  open2.value=false
  open1.value=false
  getWorkData()
}
const title=ref('待审核任务数')
const open2=ref(false)
const columns = ref([
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
    width:200,
    ellipsis: true,
  },
  {
    title: '任务说明',
    key: 'taskDescription',
    dataIndex: 'taskDescription',
    width:300,
    ellipsis: true,
  },
  {
    title: '考核方式',
    key: 'assessmentMethod',
    dataIndex: 'assessmentMethod',
  },
  {
    title: '责任部门',
    key: 'responsibleDepartmentName',
    dataIndex: 'responsibleDepartmentName',
  },
  {
    title: '考核部门',
    key: 'assessmentDepartmentName',
    dataIndex: 'assessmentDepartmentName',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '查看',
    key: 'action',
  },
]);
const data=ref([])
const open3=ref(false)
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
  open3.value=true
  getTaskInfo(record.taskCode).then(res=>{
    if (res.result=='ok'){
      taskScore.value=res.data.task.score
      forFeedBackList.value=res.data.feedBackList
      reviewFormState.value.projectName=res.data.task.projectName
      reviewFormState.value.taskName=res.data.task.taskName
      reviewFormState.value.taskDescription=res.data.task.taskDescription
      reviewFormState.value.assessmentDepartmentName=res.data.task.assessmentDepartmentName
      reviewFormState.value.startTime=res.data.task.startTime
    }
  })
}
const handleOk3=()=>{
  open3.value=false
}
const userId=ref()
const personRef=ref()
const handleGetInfo=(uid)=>{
  userId.value=uid
  nextTick(()=>{
    personRef.value.openModel()
  })
}
const open4=ref(false)
const handleHalf=()=>{
  open4.value=true
}
const handleOk4=()=>{
  open4.value=false
  getWorkData()
}
const open5=ref(false)
const handleOver=()=>{
  open5.value=true
}
const handleOk5=()=>{
  open5.value=false
  getWorkData()
}

const open6=ref(false)
const projectCode=ref()
const status=ref()
const title6=ref('')
const favoriteRef=ref()
const handleFavorite=(item,type)=>{
  title6.value=type+'任务数'
  console.log(type)
  projectCode.value=item.projectCode
  status.value=type
  nextTick(()=>{
    open6.value=true
  })
}
const handleOk6=()=>{
  open6.value=false
  getFollowData()
}
const handleDown=(item)=>{
  let link =`${import.meta.env.VITE_APP_BASE_API}/portal/r${item.url.replace('.','')}&sid=${localStorage.getItem('sid')}`
  exportFile(link,item.name)
}
</script>
<style scoped>
.oneItem{
  padding: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.oneItemTotal{
  padding: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.itemTitle{
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
}
.itemDesc{
  font-size: 18px;
  font-weight: bold;
}
</style>