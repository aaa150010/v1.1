<template>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
declare const devUserInfo:any;
declare const settingParam:any;
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods : {
    clickText(){
      alert("点击事件")
    }
  },
  computed:{
    userid(){
      return devUserInfo.userid;
    },
    sessionID(){
      return settingParam.sessionId;
    }
  },
  created() {
    document.querySelector('.preloading').style.display = 'none'
  },
  mounted() {
    let isDev = process.env.NODE_ENV != "production";
    const sess=sessionStorage.getItem('settingParam')
    if (isDev){
      localStorage.setItem('sid',settingParam.sessionId)
    }else {
      localStorage.setItem('sid', JSON.parse(sess).sessionID);
    }
  }
});
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
}
.ant-tabs-nav{
  border: 1px solid #fff!important;
  background-color: #fff!important;
}
.ant-tabs-tab-active{
  background: #e6f4ff!important;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-tabs-left >.ant-tabs-content-holder >.ant-tabs-content>.ant-tabs-tabpane, :where(.css-dev-only-do-not-override-1hsjdkk).ant-tabs-left >div>.ant-tabs-content-holder >.ant-tabs-content>.ant-tabs-tabpane{
  padding: 0 10px!important;
}
</style>
