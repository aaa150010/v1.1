<template>
  <a-config-provider :locale="zhCN">
    <router-view />
    <div
      class="w-screen h-screen fixed top-0 left-0 bg-slate-400 bg-opacity-30 center"
      style="z-index: 9000"
      v-if="fullscreenLoading"
    >
      <a-spin tip="加载中" size="large" />
    </div>
    <PersonInfoModel />
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
declare const devUserInfo: any;
declare const settingParam: any;
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import PersonInfoModel from "@/components/getPersonInfoGlobal/personInfoModel.vue";
dayjs.locale("zh-cn");
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    PersonInfoModel,
  },
  data() {
    return { zhCN };
  },
  methods: {
    clickText() {
      // alert("点击事件");
    },
  },
  computed: {
    userid() {
      return devUserInfo.userid;
    },
    sessionID() {
      return settingParam.sessionId;
    },
    fullscreenLoading() {
      return this.$store.state.loading;
    },
  },
  created() {
    document.querySelector(".preloading").style.display = "none";
  },
  mounted() {
    let isDev = process.env.NODE_ENV != "production";
    const sess = sessionStorage.getItem("settingParam");
    if (isDev) {
      localStorage.setItem("sid", settingParam.sessionId);
    } else {
      localStorage.setItem("sid", JSON.parse(sess).sessionID);
    }
  },
});
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
//.ant-tabs-nav {
//  border: 1px solid #fff !important;
//  background-color: #fff !important;
//}
.ant-tabs-tab-active {
  background: rgb(228, 237, 252) !important;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-tabs-left
  > .ant-tabs-content-holder
  > .ant-tabs-content
  > .ant-tabs-tabpane,
:where(.css-dev-only-do-not-override-1hsjdkk).ant-tabs-left
  > div
  > .ant-tabs-content-holder
  > .ant-tabs-content
  > .ant-tabs-tabpane {
  padding: 0 10px !important;
}
//文字超出显示省略号
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:deep(:where(.css-dev-only-do-not-override-1hsjdkk).ant-select-dropdown){
  background-color: rgb(4, 3, 36)!important;
}
.underBox:hover{
  text-decoration:underline
}
.textUnder{
  text-decoration: underline;
  text-decoration-color: blue;
}
</style>
