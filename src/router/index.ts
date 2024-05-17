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
        name: "workbench",
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
      {
        path: "/index/departmentView",
        name: "调度中心_部门视图",
        component: () => import("@/views/departmentView/index.vue"),
      },
      {
        path: "/index/wisdomDataV",
        name: "智慧驾舱",
        component: () => import("@/views/wisdomDataV/index.vue"),
      },
    ],
  },
  {
    path: "/wisdomDataV_dataV1_index1",
    name: "智慧驾舱-数据大屏1类型-1页面",
    component: () => import("@/views/wisdomDataV/dataV1/index1.vue"),
  },
  {
    path: "/wisdomDataV_dataV1_index2",
    name: "智慧驾舱-数据大屏1类型-2页面",
    component: () => import("@/views/wisdomDataV/dataV1/index2.vue"),
  },
  {
    path: "/wisdomDataV_dataV1_index3",
    name: "智慧驾舱-数据大屏1类型-3页面",
    component: () => import("@/views/wisdomDataV/dataV1/index3.vue"),
  },
  {
    path: "/wisdomDataV_dataV1_index4",
    name: "智慧驾舱-数据大屏1类型-4页面",
    component: () => import("@/views/wisdomDataV/dataV1/index4.vue"),
  },
  {
    path: "/wisdomDataV_dataV1_index5",
    name: "智慧驾舱-数据大屏1类型-5页面",
    component: () => import("@/views/wisdomDataV/dataV1/index5.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
