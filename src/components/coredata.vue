<template>
<div class="coredataContainer">
  <a-button type="primary">数据填报</a-button>
  <a-card :bordered="false" style="margin-top: 10px">
    <div style="display: flex;width: 100%">
     <div style="width: 80%;padding-right: 10px">
       <a-form :model="formState">
         <a-row  :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
           <a-col :span="8" >
              <a-form-item label="年份">
           <a-select
               ref="select"
               v-model:value="value1"
               @focus="focus"
               @change="handleChange"
           >
             <a-select-option value="jack">Jack</a-select-option>
             <a-select-option value="lucy">Lucy</a-select-option>
             <a-select-option value="Yiminghe">yiminghe</a-select-option>
           </a-select>
         </a-form-item>
           </a-col>
             <a-col :span="8">
         <a-form-item label="省份">
           <a-select
               ref="select"
               v-model:value="value1"
               @focus="focus"
               @change="handleChange">
             <a-select-option value="jack">Jack</a-select-option>
             <a-select-option value="lucy">Lucy</a-select-option>
             <a-select-option value="Yiminghe">yiminghe</a-select-option>
           </a-select>
         </a-form-item>
             </a-col>
         <a-col :span="8">
           <a-form-item label="学校">
             <a-input v-model:value="formState.fieldB" placeholder="input placeholder" />
           </a-form-item>
         </a-col>
       </a-row>
         <a-row :gutter="24">
           <a-col :span="24">
             <a-form-item label="学校">
               <a-tree-select
                   v-model:value="value"
                   style="width: 100%"
                   :tree-data="treeData"
                   tree-checkable
                   allow-clear
                   :show-checked-strategy="SHOW_PARENT"
                   placeholder="Please select"
                   tree-node-filter-prop="label"
               />
             </a-form-item>
           </a-col>
         </a-row>
       </a-form>
     </div>
      <div style="width: 20%;display: flex">
        <div style="width: 50%">
          <a-button type="primary" style="width: 100%;height: 100%">确认</a-button>
        </div>
        <div style="width: 50%">
          <a-button style="width: 100%;height: 100%">清空</a-button>
        </div>
      </div>
    </div>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" :loading="loading">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'"><a>修改</a></template>
      </template>
    </a-table>
  </a-card>
</div>
</template>
<script setup>
import {reactive, ref} from "vue";
const loading=ref(false)
const pagination =reactive({
  total: 10,
  current: 1,
  pageSize: 5,
  // onChange: pageChange
});
const formState=ref({
  layout:'',
  fieldA:'',
  fieldB:'',
})
const treeData = [
  {
    label: 'Node1',
    value: '0-0',
    children: [
      {
        label: 'Child Node1',
        value: '0-0-0',
      },
    ],
  },
  {
    label: 'Node2',
    value: '0-1',
    children: [
      {
        label: 'Child Node3',
        value: '0-1-0',
        disabled: true,
      },
      {
        label: 'Child Node4',
        value: '0-1-1',
      },
      {
        label: 'Child Node5',
        value: '0-1-2',
      },
    ],
  },
];
const value = ref(['0-0-0']);
const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
</script>
<style scoped>
.coredataContainer{

}
</style>