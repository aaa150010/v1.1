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
          请上传10GB以内的待测对象，支持.zip格式
        </p>
      </div>
    </a-upload-dragger>
    <a-button type="primary" @click="handleClick">确认</a-button>
  </div>
</template>
<script setup>
import {UploadOutlined } from '@ant-design/icons-vue';
import {ref} from "vue";
import {uploadFile} from "@/api/localupload";
const fileList = ref([]);
const beforeUpload = file => {
  fileList.value = [...(fileList.value || []), file];
  console.log(fileList.value)
  return false;
};
const handleClick=()=>{
  uploadFile(fileList.value).then(res=>{
    console.log(res)
  })
}
</script>
<style scoped>

</style>