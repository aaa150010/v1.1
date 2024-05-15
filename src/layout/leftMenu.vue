<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      border-right: 1px solid rgb(240, 240, 240);
    "
  >
    <div>
      <div class="personInfo1">
        <img :src="src1" style="height: 30px" />
        复杂任务管理系统
      </div>
      <a-menu :selectedKeys="activeKey" @click="handleClick">
<!--        <a-menu-item-->
<!--          key="/index/workbench"-->
<!--          @click="$router.push('/index/workbench')"-->
<!--          >工作台</a-menu-item-->
<!--        >-->
<!--        <a-menu-item-->
<!--          key="/index/datalake"-->
<!--          @click="$router.push('/index/datalake')"-->
<!--          >数据湖</a-menu-item-->
<!--        >-->
<!--        <a-menu-item-->
<!--          key="/index/departmentView"-->
<!--          @click="$router.push('/index/departmentView')"-->
<!--          >调度中心</a-menu-item-->
<!--        >-->
<!--        <a-menu-item-->
<!--          key="/index/information"-->
<!--          @click="$router.push('/index/information')"-->
<!--        >-->
<!--          <a class="head-example">消息</a>-->
<!--          <a-badge count="25" />-->
<!--        </a-menu-item>-->
<!--        <a-menu-item-->
<!--          key="/index/wisdomDataV"-->
<!--          @click="$router.push('/index/wisdomDataV')"-->
<!--          >智慧驾舱</a-menu-item-->
<!--        >-->
<!--        <a-menu-item-->
<!--          key="/index/taskManageCenter"-->
<!--          @click="$router.push('/index/taskManageCenter')"-->
<!--          >任务管理中心</a-menu-item-->
<!--        >-->
        <a-menu-item
            @click="$router.push(item.module)"
            v-for="item in leftMenu" :key="item.module"
        >

          <div v-if="item.menuTitle!=='消息'">
            {{ item.menuTitle }}
          </div>
          <div>
            <a class="head-example">消息</a>
            <a-badge :count="item.count" />
          </div>
        </a-menu-item
        >
      </a-menu>
    </div>
    <div class="personInfo">
      <a-avatar size="20" :src="avatarUrl"> </a-avatar>
      <span style="font-size: 14px; margin-left: 10px">{{ username }}</span>
    </div>
  </div>
</template>
<script setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getUserInfo } from "@/api/user";
import isDev from "@/config";
const route = useRoute();
const activeKey = ref([]);
const src1=isDev ? "/fuza.png" : "/portal/console/images/fuza.png";
const clearArray = () => {
  activeKey.value.length = 0;
};
const username = ref();
const avatarUrl = ref();
const leftMenu=ref([])
onMounted(() => {
  clearArray();
  activeKey.value.push(route.path);
  //获取用户信息
  getUserInfo().then((res) => {
    if (res.result == "ok") {
      username.value = res.data.userName;
      leftMenu.value=res.data.permission
      avatarUrl.value =
        "https://bzszkj.com/portal/r" + res.data.photo.replace(".", "");
    }
  });
});
const handleClick = ({ item, key }) => {
  clearArray();
  activeKey.value.push(key);
};
</script>
<style scoped>
.personInfo {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border-right: 1px solid rgb(240, 240, 240);
}
.personInfo:hover {
  background-color: rgba(0, 0, 0, 0.06);
  cursor: pointer;
}
.personInfo1 {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.ant-tabs-nav {
  border: 1px solid #fff !important;
  background-color: #fff !important;
}
.ant-tabs-tab-active {
  background: #e6f4ff !important;
}
</style>
