<template>
  <a-spin :spinning="spinning">
<div class="myspaceContainer">
  <div>
    <a-button type="primary" @click="handleAddFolder">新增文件夹</a-button>
    <a-button type="primary" @click="enterTop" style="margin-left: 10px">
      <template #icon><ArrowUpOutlined  /></template>
      返回上一级
    </a-button>
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
    <div style="display: flex;flex-wrap: wrap" v-if="dataList.length>0&&viewValue=='图标'">
      <template v-for="item in dataList" :key="item">
        <a-dropdown :trigger="['contextmenu']">
        <div class="oneItem" @click="handleItem(item)">
          <a-tooltip placement="bottom">
            <template #title>{{item.label}}</template>
          <div class="topIcon">
            <img :src="src1" width="70" v-if="item.format=='文件夹'">
            <img :src="src2" width="70" v-else-if="item.format=='pptx'||item.format=='ppt'">
            <img :src="src3" width="70" v-else-if="item.format=='xlsx'||item.format=='xls'">
            <img :src="src4" width="70" v-else-if="item.format=='doc'||item.format=='docx'">
            <img :src="src5" width="70" v-else-if="item.format=='pdf'">
            <img :src="src6" width="70" v-else>
          </div>
          </a-tooltip>
          <div class="bottomDesc">
              {{item.label}}
            </div>
        </div>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="handleRemoveTo(item)">
                <a>移动到</a>
              </a-menu-item>
              <a-menu-item @click="handleEdit(item)">
                <a>修改</a>
              </a-menu-item>
              <a-menu-item @click="handleDelete(item)">
                <a>删除</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </div>
    <a-empty v-else-if="dataList.length==0&&viewValue=='图标'"/>
    <a-table v-else-if="viewValue=='列表'" :columns="columns" :customRow="rowClick" :data-source="dataList" :loading="loading" :pagination="false">
      <template #bodyCell="{ column,record}">
        <template v-if="column.key === 'action'">
          <a @click="handleRemoveTo(record)">移动到</a>
          <a style="margin-left: 10px;" @click="handleEdit(record)">修改</a>
          <a style="margin-left: 10px;" @click="handleDelete(record)">删除</a>
        </template>
      </template>
    </a-table>
  </a-card>


<!--  新增/修改dialog-->
  <a-modal  v-model:open="open" :title="editOrAdd?'修改':'新增'" @ok="onSubmit" cancel-text="取消" ok-text="确认" :destroyOnClose="true" :maskClosable="false">
    <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
    >
      <a-form-item
          label="名称"
          name="name"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item
          label="权限配置"
          name="permission"
      >
        <a-select
            ref="select"
            v-model:value="formState.permission"
            @focus="focus"
        >
          <a-select-option value="私密">私密</a-select-option>
          <a-select-option value="部门共享">部门共享</a-select-option>
          <a-select-option value="学校共享">学校共享</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
<!--  移动到dialog-->
  <a-modal  v-model:open="open1" title="移动到" @ok="onSubmit1" cancel-text="取消" ok-text="确认" :destroyOnClose="true" :maskClosable="false">
    <a-form
        ref="formRef1"
        :model="permissionState"
        :rules="rules1"
    >
      <a-form-item
          label="位置"
          name="name"
      >
        <a-select
            ref="select"
            v-model:value="permissionState.space"
            @focus="focus"
            @change="handleChange"
        >
          <a-select-option value="我的空间">我的空间</a-select-option>
          <a-select-option value="部门空间">部门空间</a-select-option>
          <a-select-option value="学校公共空间">学校公共空间</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
          label="所在文件夹"
          name="newParent"
      >
        <a-tree-select
            v-model:value="permissionState.newParent"
            placeholder="请选择目录"
            allow-clear
            tree-default-expand-all
            :tree-data="treeData"
        >
        </a-tree-select>
      </a-form-item>
    </a-form>
  </a-modal>
</div>
  </a-spin>
</template>
<script setup>
import {createVNode, onMounted, ref} from "vue";
import {ArrowUpOutlined, ExclamationCircleOutlined} from '@ant-design/icons-vue';
import {addFolder, deleteFolder, editFolderOrFile, getFolderFiles, getTreeData1, removeTo} from "@/api/myspace";
import {getTreeData} from "@/api/localupload";
import download from 'downloadjs'
const src1=isDev ? "/wjj.png" : "/portal/console/images/wjj.png";
const src2=isDev ? "/ppt.png" : "/portal/console/images/ppt.png";
const src3=isDev ? "/excel.png" : "/portal/console/images/excel.png";
const src4=isDev ? "/docx.png" : "/portal/console/images/docx.png";
const src5=isDev ? "/pdf1.png" : "/portal/console/images/pdf1.png";
const src6=isDev ? "/wz.png" : "/portal/console/images/wz.png";
const spinning = ref(false);
const currentUrl=ref('')
const viewValue=ref('图标')
const dataList=ref([])
const destroyOnClose=ref(true)
import {Form, message, Modal} from 'ant-design-vue';
import isDev from "@/config";
const useForm = Form.useForm;
const open = ref(false);
const open1=ref(false)
const formRef=ref()
const formRef1=ref()
// 存放当前路径的parentCode
const parentCode=ref()
//存放当前路径的parent
const parent=ref()
//决定是新增还是修改的dialog的布尔值
const editOrAdd=ref(true)
const props=defineProps({
  space:{required:true,type:String}
})
onMounted(()=>{
  //获取我的空间所有文件
  spinning.value=true
  getTreeData1(props.space,'all','false').then(res=>{
    if (res.result=='ok'){
      //把上方当前路径更换
      currentUrl.value=res.data[0].path
      dataList.value=res.data[0].children
      parentCode.value=res.data[0].value
      parent.value=res.data[0].parent
    }
  }).finally(()=>{
    spinning.value=false
  })
})
const formState=ref({
  name:'',
  permission:'',
  resourceCode:''
})
const permissionState=ref({
  newParent:'',
  space:props.space,
  resourceCode:''
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
const rules1 = {
  space: [
    {
      required: true,
      message: '请选择位置',
      trigger: 'blur',
    },
  ],
  newParent: [
    {
      required: true,
      message: '请选择目录',
      trigger: 'blur',
    },
  ],
}
const handleItem=(item)=>{
  if (item.type=='文件'){
    // 如果是文件则直接下载
    let link =`${import.meta.env.VITE_APP_BASE_API}/portal/r${item.url.replace('.','')}&sid=${localStorage.getItem('sid')}`
    download(link,item.label)
  }else if (item.type=='文件夹'){
    //如果是文件夹则重新获取该文件夹下的目录
    spinning.value=true
    getFolderFiles(props.space,item.value).then(res=>{
      if (res.result=='ok'){
        //把上方当前路径更换
        currentUrl.value=res.data[0].path
        dataList.value=res.data[0].children
        parentCode.value=res.data[0].value
        parent.value=res.data[0].parent
      }
    }).finally(()=>{
      spinning.value=false
    })
  }
}
const handleAddFolder=()=>{
  formState.value.name=''
  formState.value.permission=''
  editOrAdd.value=false
  open.value=true
}
const { resetFields, validate } = useForm(formState);
const onSubmit = () => {
  formRef.value.validate()
      .then(() => {
        //校验成功
        spinning.value=true
        //判断是修改还是新增
        console.log(editOrAdd.value)
        if (editOrAdd.value){
          editFolderOrFile(formState.value.permission,formState.value.name,formState.value.resourceCode).then(res=>{
            if (res.result=='ok'){
              message.success('修改成功');
              getFolderFiles(props.space,parentCode.value).then(res=>{
                if (res.result=='ok'){
                  //把上方当前路径更换
                  currentUrl.value=res.data[0].path
                  dataList.value=res.data[0].children
                  parentCode.value=res.data[0].value
                  parent.value=res.data[0].parent
                }
              }).finally(()=>{
                spinning.value=false
              })
            }
          }).finally(()=>{
            open.value=false
          })
        }else {
          addFolder(parentCode.value,formState.value.permission,formState.value.name).then(res=>{
            console.log(11)
            console.log(res)
            if (res.result=='ok'){
              message.success('创建成功');
              getFolderFiles(props.space,parentCode.value).then(res=>{
                if (res.result=='ok'){
                  //把上方当前路径更换
                  currentUrl.value=res.data[0].path
                  dataList.value=res.data[0].children
                  parentCode.value=res.data[0].value
                  parent.value=res.data[0].parent
                }
              }).finally(()=>{
                spinning.value=false
              })
            }
          }).finally(()=>{
            open.value=false
            spinning.value=false
          })
        }
      })
};
//移动到
const onSubmit1 = () => {
  formRef1.value.validate()
      .then(()=>{
        spinning.value=true
        removeTo(permissionState.value.resourceCode,permissionState.value.newParent).then(res=>{
          if (res.result=='ok'){
            message.success('移动成功');
            getFolderFiles(props.space,parentCode.value).then(res=>{
              if (res.result=='ok'){
                //把上方当前路径更换
                currentUrl.value=res.data[0].path
                dataList.value=res.data[0].children
                parentCode.value=res.data[0].value
                parent.value=res.data[0].parent
              }
            }).finally(()=>{
              spinning.value=false
            })
          }
        }).finally(()=>{
          open1.value=false
          spinning.value=false
        })
      })
}
//返回上一级
const enterTop=()=>{
  console.log(parent.value)
  spinning.value=true
  getFolderFiles(props.space,parent.value).then(res=>{
    console.log(res)
    console.log(11)
    if (res.result=='ok'){
      //把上方当前路径更换
      currentUrl.value=res.data[0].path
      dataList.value=res.data[0].children
      parentCode.value=res.data[0].value
      parent.value=res.data[0].parent
    }else {
      // message.error(res.msg)
    }
  }).finally(()=>{
    spinning.value=false
  })
}
//修改权限
const handleRemoveTo=(item)=>{
  permissionState.value.space=props.space
  permissionState.value.newParent=''
  permissionState.value.resourceCode=item.value
  getTreeData(permissionState.value.space).then(res=>{
    if (res.result=='ok'){
      treeData.value=res.data
    }
  })
  open1.value=true
}
//修改
const handleEdit=(item)=>{
  editOrAdd.value=true
  formState.value.name=item.label
  formState.value.permission=item.permissionType
  formState.value.resourceCode=item.value
  open.value=true
}
//删除
const handleDelete=(item)=>{
  Modal.confirm({
    title: '确认删除?',
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确认',
    okType: 'danger',
    cancelText: '取消',
    async onOk() {
      try {
        return await new Promise((resolve, reject) => {
          deleteFolder(item.value).then(res=>{
            if (res.result=='ok'){
              message.success('删除成功');
              spinning.value=true
              getFolderFiles(props.space,parentCode.value).then(res=>{
                if (res.result=='ok'){
                  //把上方当前路径更换
                  currentUrl.value=res.data[0].path
                  dataList.value=res.data[0].children
                  parentCode.value=res.data[0].value
                  parent.value=res.data[0].parent
                  resolve()
                }
              }).finally(()=>{
                spinning.value=false
              })
            }
          })
        });
      } catch {
        return console.log('Oops errors!');
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
const treeData=ref([])
//空间选择变化重新获取树形目录
const handleChange=()=>{
  getTreeData(permissionState.value.space).then(res=>{
    if (res.result=='ok'){
      treeData.value=res.data
    }
  })
}
// 列表形式
const columns = [
  {
    title: '名称',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '上传人',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: '权限',
    dataIndex: 'permissionType',
    key: 'permissionType',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];
function rowClick(record, index) {
  return {
    onDblclick: (event) => {
      handleItem(record)
    },
  };
}

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