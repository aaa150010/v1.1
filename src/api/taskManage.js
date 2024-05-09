import { post, get, postForm } from "@/awsuiAxios/index.js";

// 获取项目模板
export function getProjectModelApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getTemplate",
    data: data,
  });
}

// 新增空白项目
export function addProjectApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_addProject",
    data: data,
    isLoading: true,
  });
}

// 获取所有项目
export function getProjectApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getAllProject",
    data: data,
  });
}

// 修改项目
export function updateProjectApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_updateProject",
    data: data,
  });
}

// 获取任务树
export function getProjectTreeApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getTaskTreeByProjectCode",
    data: data,
  });
}

// 获取模板List部门List和人的List
export function getSelectDataApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getSelectData",
    data: data,
  });
}