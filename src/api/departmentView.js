import { post, get, postForm } from "@/awsuiAxios/index.js";

// 根据部门查看相关任务
export function getTaskByDepartmentIdApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getTaskByDepartmentId",
    data: data,
    isLoading: true,
  });
}

// 根任务编号查看任务
export function getTaskByTaskCodeApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getTaskByTaskCode",
    data: data,
    isLoading: true,
  });
}

// 根任务编号查看任务详情
export function getTaskDetailByCodeApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getTaskDetailByCode",
    data: data,
    isLoading: true,
  });
}
