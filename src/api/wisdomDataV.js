import { post, get, postForm } from "@/awsuiAxios/index.js";

// 获取核心数据
export function getCoreDataApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition.controller_getCoreDataView",
    data: data,
    isLoading: true,
  });
}
// 获取任务进展数据
export function getProgressDataApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition.controller_getProgressInfo",
    data: data,
    isLoading: true,
  });
}

// 按照部门查找任务数量
export function getTaskByDepartmentApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition.controller_getTaskByDepartment",
    data: data,
    isLoading: true,
  });
}

// 查找部门任务信息
export function getDepartmentTaskApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition.controller_getDepartmentTask",
    data: data,
    isLoading: true,
  });
}

export function getSecondTaskApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition.controller_getSecondTask",
    data: data,
    isLoading: true,
  });
}
