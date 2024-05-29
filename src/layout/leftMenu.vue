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
        高校项目管理系统
      </div>
      <a-menu :selectedKeys="activeKey" @click="handleClick">
        <a-menu-item
          @click="$router.push(item.module)"
          v-for="item in leftMenu"
          :key="item.module"
        >
          <div
            v-if="item.module !== '/index/information'"
            class="flex items-center"
          >
            <span v-html="item.icon"></span>
            <span style="margin-left: 4px">{{ item.menuTitle }}</span>
          </div>
          <div class="flex items-center" v-else>
            <span v-html="item.icon"></span>
            <span style="margin-left: 4px">
              <a class="head-example">{{ item.menuTitle }}</a>
              <a-badge :count="store.unreadNumber" />
            </span>
          </div>
        </a-menu-item>
      </a-menu>
    </div>
    <div>
      <div
        class="center text-blue-400 cursor-pointer underline"
        @click="toDataV"
      >
        综合数据大屏监控
      </div>
      <div class="personInfo flex justify-between">
        <div>
          <a-avatar size="20" :src="avatarUrl"> </a-avatar>
          <span style="font-size: 14px; margin-left: 10px">{{ username }}</span>
        </div>
        <LogoutOutlined
          class="float-right"
          style="font-size: 20px"
          @click="loginOut"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserInfo, loginOutApi } from "@/api/user";
import isDev from "@/config";
import { message, Modal } from "ant-design-vue";
import { usePiniaStore } from "@/pinia";
import { createVNode } from "vue";
const route = useRoute();
const router = useRouter();
const activeKey = ref([]);
const src1 = isDev ? "/fuza.png" : "/portal/console/images/fuza.png";
const clearArray = () => {
  activeKey.value.length = 0;
};
const store = usePiniaStore();
const username = ref();
const avatarUrl = ref();
const leftMenu = ref([]);
onMounted(() => {
  clearArray();
  activeKey.value.push(route.path);
  //获取用户信息
  getUserInfo().then((res) => {
    if (res.result == "ok") {
      username.value = res.data.userName;
      leftMenu.value = res.data.permission;
      sessionStorage.setItem("userInfo", JSON.stringify(res.data));
      avatarUrl.value = "/portal/r" + res.data.photo.replace(".", "");
    }
    leftMenu.value.forEach((item) => {
      if (item.module == "/index/information") {
        store.setNumber(item.count);
      }
    });
  });
});
const handleClick = ({ item, key }) => {
  clearArray();
  activeKey.value.push(key);
};

const loginOut = () => {
  Modal.confirm({
    title: "你确定要退出登入吗?",
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      loginOutApi().then((res) => {
        if (res.result == "ok") {
          message.success("退出成功");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
    },
  });
};

const toDataV = () => {
  let page = router.resolve({
    path: "/wisdomDataV_dataV2_index1",
  });

  window.open(page.href, "_blank");
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
