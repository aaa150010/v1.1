import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    redirect: "/index/workbench",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/index/workbench",
        name: "工作台",
        component: () => import("@/views/workbench/index.vue"),
      },
      {
        path: "/index/datalake",
        name: "数据湖",
        component: () => import("@/views/datalake/index.vue"),
      },
      {
        path: "/index/taskManageCenter",
        name: "任务管理中心",
        component: () => import("@/views/taskManageCenter/index.vue"),
      },
      {
        path: "/index/information",
        name: "消息",
        component: () => import("@/views/information/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
