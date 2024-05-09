<template>
<div class="informationContainer">
  <div class="topNative">
    <a-button type="primary" @click="handleReadMessage">一键删除已读消息</a-button>
    <div>
      查看方式
      <a-select
          ref="select"
          v-model:value="viewValue"
          style="width: 120px"
          @change="handleChange"
          @focus="focus"
      >
        <a-select-option value="全部">全部</a-select-option>
        <a-select-option value="仅查看未读">仅查看未读</a-select-option>
      </a-select>
    </div>
  </div>
  <a-card  :bordered="false" style="margin-top: 10px">
    <a-table :columns="columns" :data-source="data" :pagination="pagination">
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <a style="color: blue" @click="handleClickItem(record)">查看</a>
        </template>
        <template v-if="column.key === 'desc'">
        <a style="color: blue">{{record.desc}}</a>
        </template>
      </template>
    </a-table>
  </a-card>
<!--  查看的dialog-->
  <a-modal v-model:open="open" :title="formState.title" :footer="null">
    <a-form
        :model="formState"
        name="basic"
    >
      <a-form-item
          label="项目名称"
      >
        <div>{{formState.title}}</div>
      </a-form-item>
      <a-form-item
          label="任务名称"
      >
        <div>{{formState.title}}</div>
      </a-form-item>
      <a-form-item
          label="任务说明"
      >
        <div>{{formState.title}}</div>
      </a-form-item>
      <a-form-item
          label="任务下发时间"
      >
        <div>{{formState.title}}</div>
      </a-form-item>
      <a-form-item
          label="任务截止时间"
      >
        <div>{{formState.title}}</div>
      </a-form-item>
    </a-form>
      <a-button type="primary" style="width: 100%">立即处理</a-button>
  </a-modal>
</div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {notification} from "ant-design-vue";
const viewValue=ref('全部')
const open=ref(false)
const formState=ref({
  title:'【2023高等职业学校综合考核】 任务将到期'
})
onMounted(()=>{
  //页面初始化请求全部并且带有分页的数据


  //如果有待办项则提示
  notification.open({
    message: 'Notification Title',
    description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
})
const pagination =reactive({
  total: 10,
  current: 1,
  pageSize: 5,
  // onChange: pageChange
});
const columns = [
  {
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
  },
  {
    title: '消息内容',
    dataIndex: 'desc',
    key: 'desc',
    width:'40%',
    ellipsis: true,
  },
  {
    title: '消息送达时间',
    dataIndex: 'deliveryTime',
    key: 'deliveryTime',
  },
  {
    title: '消息已读时间',
    key: 'readTime',
    dataIndex: 'readTime',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
  },
];
const data = [
  {
    serialNumber: '1',
    desc: '【2023高等职业学校综合考核】 任务将到期,请立即前去处理,任务将到期,请立即前去处理,任务将到期,请立即前去处理',
    deliveryTime: '2023-10-25',
    readTime: '2023-10-25',
    status: '未读',
  },
];
// 一键已读
const handleReadMessage=()=>{

}
//更改查看的消息类型
const handleChange=()=>{

}
const handleClickItem=(item)=>{
  console.log(item)
  open.value=true
}
</script>
<style scoped>
.informationContainer{
  padding: 10px;
}
.topNative{
  display: flex;
  justify-content: space-between;
}
</style>