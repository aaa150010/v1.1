<template>
<div>
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
          <a-tooltip placement="topLeft" color="#108ee9">
            <template #title>    {{ record.taskDescription }}</template>
            {{ record.taskDescription }}
          </a-tooltip>
        </template>
        <template v-if="column.key === 'action'">
         <a style="color: blue" @click="handleClick(record)">办理</a>
        </template>
      </template>
    </a-table>
  </a-card>
<!--  未完成打开的提交dialog-->
  <a-modal v-model:open="open1" title="办理" @ok="handleOk1" :width="800" :maskClosable="false">
    <a-form :model="addFormState" ref="addFormRef" :rules="rules">
      <a-form-item label="项目名称">
        <a-input disabled v-model:value="addFormState.projectName" />
      </a-form-item>
      <a-form-item label="任务名称">
        <a-input disabled v-model:value="addFormState.taskName" />
      </a-form-item>
      <a-form-item label="任务说明">
        <a-input disabled v-model:value="addFormState.taskDescription" />
      </a-form-item>
      <a-form-item label="进度反馈" name="progressFeedback">
        <a-textarea style="height: 80px" v-model:value="addFormState.progressFeedback" />
      </a-form-item>
      <a-form-item label="任务自评分" name="selfScore">
        <a-input-number style="width: 100%" v-model:value="addFormState.selfScore" />
      </a-form-item>
      <div>
        <div style="display: flex;justify-content: space-between">
          <div>佐证材料</div>
          <a-button type="link" @click="handleClickAddFile">新增</a-button>
        </div>
        <div style="display: flex;justify-content: space-between;margin-top: 10px">
          <div>
            当前选中的文件：<a style="color: blue">{{selectFileName==null?'暂未选择文件':selectFileName}}</a>
          </div>
          <div v-if="selectFileName!==null">
            <a-button type="link" @click="downFile">查看</a-button>
            <a-button type="link" @click="updataFile">修改</a-button>
            <a-button type="link" @click="deleteFile">删除</a-button>
          </div>
        </div>
      </div>
    </a-form>
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
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择文件"
            allow-clear
            tree-default-expand-all
            :tree-data="treeData"
            tree-node-filter-prop="label"
            @select="handleSelect"
        >
        </a-tree-select>
        <div style="margin-top: 300px">
          当前选中的文件：{{selectFileName==null?'暂未选择文件':selectFileName}}
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import download from 'downloadjs'
import {addFeedback, getAllResource, getTodoTaskList} from "@/api/workprogress";
import { SmileOutlined} from '@ant-design/icons-vue';
import Localupload from "@/components/localupload.vue";
import {message} from "ant-design-vue";
const activeKey = ref('1');
const loading=ref(false)
const open1 =ref(false)
const open2 =ref(false)
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
  // {
  //   title: '考核方式',
  //   key: 'taskDescription',
  //   dataIndex: 'taskDescription',
  // },
  {
    title: '责任部门',
    key: 'responsibleDepartmentName',
    dataIndex: 'responsibleDepartmentName',
  },
  // {
  //   title: '考核部门',
  //   key: 'responsibleDepartmentName',
  //   dataIndex: 'responsibleDepartmentName',
  // },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作',
    key: 'action',
  },
]);
const data=ref([])
//新增的form
const addFormRef=ref()
const addFormState=ref({
  taskCode:null,
  projectName:null,
  taskName:null,
  taskDescription:null,
  progressFeedback:null,
  supportingMaterials:null,
  selfScore:null
})
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
      required: true,
      message: '请输入任务自评分',
      trigger: 'blur',
    },
  ],
})
onMounted(()=>{
  loading.value=true
  getTodoTaskList().then(res=>{
    if (res.result=='ok'){
      data.value=res.data
      console.log(res.data)
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
    addFormState.value.supportingMaterials=record.supportingMaterials
    // 每次打开置空
    addFormState.value.selfScore=null
    selectFileName.value=null
    selectFileUrl.value=null
    addFormState.value.supportingMaterials=null
    value.value=null
    searchValue.value=null
    activeKey.value='1'
    open1.value=true
  }else if (record.status=='待审核'){

  }
}
const handleClickAddFile=()=>{
  open2.value=true
}
// 树形结构绑定的值
const value = ref();
const treeData = ref([]);
const searchValue = ref('');
watch(value, () => {
  console.log(value.value);
  // 如果为undefined说明被清空了
  if (value.value==undefined){
    selectFileName.value=null
    selectFileUrl.value=null
    addFormState.value.supportingMaterials=null
  }
});
//存放选中的文件名称
const selectFileName=ref(null)
//存放选中的文件下载地址
const selectFileUrl=ref(null)
//存放选中的文件code-->  addFormState.supportingMaterials
const handleSelect=(keys,e)=>{
  selectFileName.value=e.label
  selectFileUrl.value=e.label
  addFormState.value.supportingMaterials=e.value
}
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
  if (selectFileName.value==null){
    message.error('请先选择佐证材料')
  }else {
    addFormRef.value.validate()
        .then(()=>{
          addFeedback(addFormState.value).then(res=>{
            if (res.result=='ok'){
              console.log(res.data)
            }
          })
          // open1.value=false
          // loading.value=true
          // getTodoTaskList().then(res=>{
          //   if (res.result=='ok'){
          //     data.value=res.data
          //     console.log(res.data)
          //   }
          // }).finally(()=>{
          //   loading.value=false
          // })
        })
  }
}
const downFile=()=>{
  // 如果是文件则直接下载
  let link =`${import.meta.env.VITE_APP_BASE_API}/portal/r${selectFileUrl.value.replace('.','')}&sid=${localStorage.getItem('sid')}`
  download(link,selectFileName.value)
}
const updataFile=()=>{
  open2.value=true
}
const deleteFile=()=>{
  selectFileName.value=null
  selectFileUrl.value=null
  addFormState.value.supportingMaterials=null
}
</script>
<style scoped>

</style>