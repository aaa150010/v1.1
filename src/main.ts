import { createApp } from "vue";
import App from "./App.vue";
//import './registerServiceWorker' pwa配置，暂时不用
import router from "./router";
import store from "./store";
/* eslint-disable */
import awsui from "../lib/awsui.es"; //注意awsui组件库根据情况指定路径
import "../lib/awsui.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "@/style/main.css";
import Menus from "vue3-menus";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
app.use(store);
app.use(router);
app.use(awsui);
app.use(Antd);
app.use(Menus);
app.use(pinia);
// app.use(ElementPlus, { size: 'small', zIndex: 3000 });
const mountApp = () => {
  app.mount("#app");
};
const getSid = awsui.getSid;
if (app.config.globalProperties.AWSPageContext.production) {
  mountApp();
} else {
  getSid.exec(app).then(() => {
    mountApp();
  });
}
