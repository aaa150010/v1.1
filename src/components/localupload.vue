<template>
  <div>
    <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        :before-upload="beforeUpload"
        @change="handleChange"
        @drop="handleDrop"
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
import {getTreeData, uploadFile} from "@/api/localupload";
import { message, Upload } from 'ant-design-vue';
import isDev from "@/config";
import axios from "@/axios";
import {getSid} from "@/utils";
const fileList = ref([]);
const optionValue1=ref('我的空间')
const treeData = ref([])
const showFullLoading=ref(false)
const percent=ref(0)
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
  getTreeData(optionValue1.value).then(res=>{
    if (res.result=='ok'){
      treeData.value=res.data
    }
  })
}

const beforeUpload = file => {

  const isLt500M = file.size / 1024 / 1024 < 1;
  if (!isLt500M) {
    message.error('文件大小不能超过500MB!');
    return   Upload.LIST_IGNORE
  }else{
    fileList.value = [...(fileList.value || []), file];
  }
  return false;
}
const urlList=ref([])
const responses=ref([])
const handleClick=()=>{
  if (fileList.value.length==0){
    message.error('请先选择文件!');
  }else {
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
      responses.forEach(item=>{
        urlList.value.push(item.data.data.attrs.url)
      })
      console.log(urlList.value)
      // 发送第二个 axios 请求
      // return axios({
      //   method: "post",
      //   url:  `${isDev?'AWSDEVURL/r/':'/portal/r/'}jd?cmd=com.awspaas.user.apps.complex_task_decomposition&sid=${getSid()}&groupValue=dir1&fileValue=dir2&repositoryName=myfile&extParam=`,
      //   data:{item},
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // })
    })
    // .then(finalResponse => {
    //   // 对第二个请求的返回数据进行处理
    //   console.log(finalResponse.data);
    // })
    // .catch(error => {
    //   // 错误处理
    //   console.error(error);
    // });
  }

  }

 //  showFullLoading.value=true
 //  percent.value=0
 // const setInt= setInterval(()=>{
 //    percent.value++
 //    if (percent.value==100){
 //      clearInterval(setInt)
 //    }
 //  },5)
const value = ref();

watch(value, () => {
  console.log(value.value);
})
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