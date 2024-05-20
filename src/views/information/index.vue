<template>
  <div class="informationContainer">
    <div class="topNative">
      <a-button type="primary" @click="handleReadMessage"
        >一键删除已读消息</a-button
      >
      <div>
        查看方式
        <a-select
          ref="select"
          v-model:value="viewValue"
          style="width: 120px"
          @change="handleChange"
          @focus="focus"
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="unread">仅查看未读</a-select-option>
          <a-select-option value="read">仅查看已读</a-select-option>
        </a-select>
      </div>
    </div>
    <a-card :bordered="false" style="margin-top: 10px">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
      >
        <template #headerCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <div>操作</div>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag color="#1677ff" v-if="record.status == '已读'">已读</a-tag>
            <a-tag color="#f50" v-else>未读</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a style="color: blue" @click="handleClickItem(record)">查看</a>
          </template>
          <template v-if="column.key === 'desc'">
            <a style="color: blue">{{ record.desc }}</a>
          </template>
        </template>
      </a-table>
    </a-card>
    <!--  查看的dialog-->
    <a-modal v-model:open="open" :footer="null" width="50%">
      <div
        style="text-align: center; margin-top: 30px; font-size: 20px"
        class="ellipsis"
      >
        {{ title }}
      </div>
      <iframe :src="src" class="test" width="100%" allow="payment"></iframe>
      <a-button
        type="primary"
        v-if="showBtn"
        style="width: 100%"
        @click="handleToOverView"
        >立即处理</a-button
      >
    </a-modal>
  </div>
</template>
<script setup>
import { computed, createVNode, onMounted, reactive, ref } from "vue";
import { message, Modal, notification } from "ant-design-vue";
import {
  addDeleteMessage,
  addReadMessage,
  getInformationByType,
  getUnreadNumber,
} from "@/api/information";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { usePiniaStore } from "@/pinia";
import { useRouter } from "vue-router";
const viewValue = ref("all");
const open = ref(false);
const showBtn = ref(false);
const itemUrl = ref();
const title = ref();
const loading = ref(false);
const toOverview = ref();
const src = computed(() => {
  return (src.value = `${import.meta.env.VITE_APP_BASE_API}/portal/r${
    itemUrl.value
  }&sid=${localStorage.getItem("sid")}`);
});
onMounted(() => {
  //页面初始化请求全部并且带有分页的数据
  loading.value = true;
  getInformationByType(pagination.current, viewValue.value)
    .then((res) => {
      if (res.result == "ok") {
        console.log(res.data);
        pagination.total = res.data.total;
        data.value = res.data.messageData;
      }
    })
    .finally(() => {
      loading.value = false;
    });
});
const pageChange = (page) => {
  pagination.current = page;
  loading.value = true;
  getInformationByType(pagination.current, viewValue.value).then((res) => {
    if (res.result == "ok") {
      pagination.total = res.data.total;
      data.value = res.data.messageData;
    }
  }).finally(() => {
    loading.value = false;
  });
};
const pagination = reactive({
  total: 1,
  current: 1,
  pageSize: 10,
  onChange: pageChange,
});
const columns = [
  {
    title: "消息内容",
    dataIndex: "messageTitle",
    key: "messageTitle",
    width: "40%",
    ellipsis: true,
  },
  {
    title: "消息送达时间",
    dataIndex: "deliveryTime",
    key: "deliveryTime",
  },
  {
    title: "消息已读时间",
    key: "readTime",
    dataIndex: "readTime",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Action",
    key: "action",
  },
];
const data = ref([]);
const router = useRouter();
// 一键删除已读
const handleReadMessage = () => {
  Modal.confirm({
    title: "确认要删除吗?",
    icon: createVNode(ExclamationCircleOutlined),
    okText: "确认",
    okType: "danger",
    cancelText: "取消",
    onOk() {
      addDeleteMessage().then((res) => {
        if (res.result == "ok") {
          message.success("删除成功");
          pagination.current = 1;
          loading.value=true
          getInformationByType(pagination.current, viewValue.value).then(
            (res) => {
              if (res.result == "ok") {
                console.log(res.data);
                pagination.total = res.data.total;
                data.value = res.data.messageData;
              }
            }
          ).finally(() => {
            loading.value = false;
          });
        }
      });
    },
    onCancel() {},
  });
};
//更改查看的消息类型
const handleChange = () => {
  pagination.current = 1;
  loading.value=true
  getInformationByType(pagination.current, viewValue.value).then((res) => {
    if (res.result == "ok") {
      pagination.total = res.data.total;
      data.value = res.data.messageData;
    }
  }).finally(() => {
    loading.value = false;
  });
};
const handleClickItem = (item) => {
  toOverview.value = item.url;
  addReadMessage(item.messageCode).then((res) => {
    if (res.result == "ok") {
      loading.value=true
      getInformationByType(pagination.current, viewValue.value).then((res) => {
        if (res.result == "ok") {
          console.log(res.data);
          pagination.total = res.data.total;
          data.value = res.data.messageData;
        }
      }).finally(() => {
        loading.value = false;
      });
      // 重新获取未读消息数量
      getUnreadNumber().then((res) => {
        if (res.result == "ok") {
          store.setNumber(res.data);
        }
      });
    }
  });
  title.value = item.messageTitle;
  showBtn.value = item.flag;
  itemUrl.value = item.messageContent;
  open.value = true;
};
const store = usePiniaStore();
// const handleCancel=()=>{
//   getUnreadNumber().then(res=>{
//     if (res.result=='ok'){
//       store.setNumber(res.data)
//     }
//   })
// }
const handleToOverView = () => {
  router.push({ name: "workbench", params: { activeKey: toOverview.value } });
};
</script>
<style scoped>
.informationContainer {
  padding: 10px;
}
.topNative {
  display: flex;
  justify-content: space-between;
}
.test {
  height: 0;
  min-height: 600px;
}
</style>
