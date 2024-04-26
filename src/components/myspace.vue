<template>
  <a-spin :spinning="spinning">
<div class="myspaceContainer">
  <div>
    <a-button type="primary" @click="handleAddFolder">新增文件夹</a-button>
  </div>
  <div class="topSelect">
    <div>
      <span style="margin-right: 5px">当前路径:</span>
      <a>{{currentUrl}}</a>
    </div>
    <div>
      查看方式
      <a-select
          ref="select"
          v-model:value="viewValue"
          style="width: 120px"
          @focus="focus"
      >
        <a-select-option value="图标">图标</a-select-option>
        <a-select-option value="列表">列表</a-select-option>
      </a-select>
    </div>
  </div>
  <a-card>
    <div style="display: flex;flex-wrap: wrap" v-if="dataList.length>0">
      <template v-for="item in dataList" :key="item">
        <a-dropdown :trigger="['contextmenu']">
        <div class="oneItem" @click="handleItem(item)">
          <div class="topIcon">
            <img src="@/assets/wjj.png" width="70" v-if="item.format=='文件夹'">
            <img src="@/assets/ppt.png" width="70" v-else-if="item.format=='pptx'||item.format=='ppt'">
            <img src="@/assets/excel.png" width="70" v-else-if="item.format=='xlsx'||item.format=='xls'">
            <img src="@/assets/docx.png" width="70" v-else-if="item.format=='doc'||item.format=='docx'">
            <img src="@/assets/pdf1.png" width="70" v-else-if="item.format=='pdf'">
            <img src="@/assets/wz.png" width="70" v-else>
          </div>
          <div class="bottomDesc">
            <a-tooltip placement="bottom">
              <template #title>{{item.label}}</template>
              {{item.label}}
            </a-tooltip>
            </div>
        </div>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a>移动到</a>
              </a-menu-item>
              <a-menu-item>
                <a>重命名</a>
              </a-menu-item>
              <a-menu-item>
                <a>更改权限</a>
              </a-menu-item>
              <a-menu-item>
                <a>删除</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </div>
    <a-empty v-else/>
  </a-card>

  <a-modal v-model:open="open" title="新增" @ok="handleOk">
    <a-form
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          label="文件夹名称"
          name="name"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item
          label="权限配置"
          name="permission"
      >
        <a-input v-model:value="formState.permission" />
      </a-form-item>
    </a-form>
  </a-modal>
</div>
  </a-spin>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {FileExcelTwoTone} from '@ant-design/icons-vue';
import {addFolder, getTreeData} from "@/api/myspace";
const spinning = ref(false);
const currentUrl=ref('我的空间')
const viewValue=ref('图标')
const dataList=ref([])
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;
const temporyParent=ref('')
const open = ref(false);
onMounted(()=>{
  //获取我的空间所有文件
  spinning.value=true
  getTreeData('我的空间','所有','false','我的空间').then(res=>{
    if (res.result=='ok'){
      console.log(res.data)
      dataList.value=res.data
    }
  }).finally(()=>{
    spinning.value=false
  })
})
const formState=ref({
  name:'',
  permission:'',
  space:''
})
const rules = {
  name: [
    {
      required: true,
      message: '请输入文件夹名称',
      trigger: 'blur',
    },
  ],
  permission: [
    {
      required: true,
      message: '请选择权限',
      trigger: 'blur',
    },
  ],
}
const handleItem=(item)=>{
  if (item.type=='文件'){
    // 如果是文件则直接下载

  }else if (item.type=='文件夹'){
    //如果是文件夹则重新获取该文件夹下的目录
    //把上方当前路径更换
    currentUrl.value=item.path
    spinning.value=true
    temporyParent.value=item.value
    getTreeData('我的空间','所有','false',item.value).then(res=>{
      if (res.result=='ok'){
        dataList.value=res.data
        console.log(res.data)
      }
    }).finally(()=>{
      spinning.value=false
    })
  }
}
const handleAddFolder=()=>{
  open.value=true
}
const { resetFields, validate } = useForm(formState);
const onSubmit = () => {
  validate()
      .then(() => {
        console.log(modelRef);
      })
      .catch(err => {
        console.log('error', err);
      });
};
</script>
<style scoped>
.topSelect{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.oneItem{
  width: 100px;
  height: auto;
  margin-right: 30px;
  margin-bottom: 30px;
}
.topIcon:hover{
  background-color: rgb(230, 244, 255);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.topIcon{
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 15px;
}
.bottomDesc{
  width: 100px;
  height: 20px;
  text-align: center;
  color: #1677ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>