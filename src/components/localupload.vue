<template>
  <div>
    <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        :before-upload="beforeUpload"
    >
      <div style="height: 400px;display: flex;justify-content: center;flex-direction: column">
        <p class="ant-upload-drag-icon">
          <UploadOutlined></UploadOutlined>
        </p>
        <p class="ant-upload-text">点击或拖拽文件至此即可上传文件</p>
        <p class="ant-upload-hint">
          请上传500MB以内的文件
        </p>
      </div>
    </a-upload-dragger>
    <div style="margin-top: 10px;padding: 10px">
      <div>数据湖存储位置</div>
      <div style="display: flex;margin-top: 10px">
        <a-select
            ref="select"
            v-model:value="optionValue1"
            style="width: 200px"
            @focus="focus"
            @change="handleChange"
        >
          <a-select-option value="我的空间">我的空间</a-select-option>
          <a-select-option value="部门空间">部门空间</a-select-option>
          <a-select-option value="学校公共空间">学校公共空间</a-select-option>
        </a-select>
        <a-tree-select
            v-model:value="value"
            style="width: 300px"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择目录"
            allow-clear
            tree-default-expand-all
            :tree-data="treeData"
            tree-node-filter-prop="name"
        >
        </a-tree-select>
        <a-button type="primary" @click="handleClick">确认</a-button>
      </div>
    </div>
<!--    全屏loading-->
    <div class="fullLoading" v-if="showFullLoading&&percent!==100">
      <a-progress type="circle" :percent="percent" :size="200">
        <template #format="percent">
          <div class="centerTitle">正在上传中：{{percent}}%</div>
        </template>
      </a-progress>
    </div>
  </div>
</template>
<script setup>
import {UploadOutlined } from '@ant-design/icons-vue';
import {onMounted, ref, watch} from "vue";
import {getTreeData} from "@/api/localupload";
import { message, Upload } from 'ant-design-vue';
import isDev from "@/config";
import axios from "@/axios";
import {getSid} from "@/utils";
import {usePiniaStore} from "@/pinia";
const fileList = ref([]);
const optionValue1=ref('我的空间')
const treeData = ref([])
const showFullLoading=ref(false)
const percent=ref(0)
const pinia=usePiniaStore()
const value = ref(null);
onMounted(()=>{
  //获取树形目录
  getTreeData(optionValue1.value).then(res=>{
    if (res.result=='ok'){
      treeData.value=res.data
    }
  })
})
//空间选择变化重新获取树形目录
const handleChange=()=>{
  value.value=null
  getTreeData(optionValue1.value).then(res=>{
    if (res.result=='ok'){
      treeData.value=res.data
    }
  })
}

const beforeUpload = file => {

  const isLt500M = file.size / 1024 / 1024 < 1;
  if (!isLt500M) {
    message.error('文件大小不能超过1MB!');
    return   Upload.LIST_IGNORE
  }else{
    fileList.value = [...(fileList.value || []), file];
  }
  return false;
}
// 返回第一个接口返回url的数组
const urlList=ref([])
// 存放第一波返回接口的对象数组
const responses=ref([])
const handleClick=()=>{
  if (fileList.value.length==0||value.value==null){
    message.error('请先选择文件或目录!');
  }else {
    pinia.showFullLoading()
    fileList.value.forEach((item)=>{
      const request=  axios({
        method: "post",
        url:  `${isDev?'AWSDEVURL/r/':'/portal/r/'}uf?appId=com.awspaas.user.apps.complex_task_decomposition&sid=${getSid()}&groupValue=dir1&fileValue=dir2&repositoryName=myfile&extParam=`,
        data:{item},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      responses.value.push(request)
    })
    Promise.all(responses.value)
    .then(responses => {
      // 提取所有请求的数据
      console.log(responses)
      responses.forEach((response,index)=>{
        const newObj={
          "type": "文件",
          "parent": value.value,
          "name": fileList.value[index].name,
          "size": fileList.value[index].size,
          "space": optionValue1.value,
          "permissionType": "私密",
          "url": response.data.data.attrs.url
        }
        if (value.value==undefined){
          newObj.parent=newObj.space
        }
        urlList.value.push(newObj)
      })
      // console.log(urlList.value)
      // 发送第二个 axios 请求
      return axios({
        method: "post",
        url:  `${isDev?'AWSDEVURL/r/':'/portal/r/'}jd?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_createResources&sid=${getSid()}`,
        data:  {
          list:urlList.value,
          parent:value.value
        },
      })
    })
    .then(finalResponse => {
      // 对第二个请求的返回数据进行处理
      if (finalResponse.result=='ok'){
        message.success(finalResponse.msg)
      }
    }).finally(()=>{
      urlList.value=[]
      fileList.value=[]
      responses.value=[]
      pinia.hideFullLoading()
    })
  }

  }
</script>
<style scoped>
.fullLoading{
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
}
.centerTitle{
  font-size: 18px;
  color: #fff;
}
</style>