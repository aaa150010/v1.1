import { post, get, postForm } from "@/awsuiAxios/index.js";

// 获取项目模板
export function getProjectModelApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getTemplate",
    data: data,
  });
}

// 获取项目类型
export function getProjectTypeListApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getProjectTypeList",
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
export function getProjectApi({ order, flag, conditions }) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getAllProject",
    params: { order, flag },
    data: conditions,
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
    isLoading: true,
  });
}

// 获取模板List部门List和人的List
export function getSelectDataApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_getSelectData",
    data: data,
  });
}

// 获取新增子节点
export function addNodeApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_addTask",
    data: data,
    isLoading: true,
  });
}

// 修改子节点
export function updateNodeApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_updateTask",
    data: data,
    isLoading: true,
  });
}

// 删除子节点
export function deleteNodeApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_deleteTask",
    data: data,
    isLoading: true,
  });
}

// 保存项目筛选条件
export function addFilterConditionsApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_addFilterConditions",
    data: data,
    isLoading: true,
  });
}

export function updateShowOneApi(data) {
  return get({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_updateShowOne",
    data: data,
  });
}
