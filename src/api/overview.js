import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//获取工作进度
export function getWorkbench() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getWorkbench&sid=${getSid()}`,
    });
}
//获取我的关注
export function getFollowProjectList() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getFollowProjectList&sid=${getSid()}`,
    });
}
//点击数字查询任务信息列表
export function getTaskInfoList(status,flag,projectCode) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getTaskInfoList&sid=${getSid()}&status=${status}&flag=${flag}&projectCode=${projectCode}`,
    });
}
//获取耗时过半的任务
export function getHalfTask() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getWarningTaskList&sid=${getSid()}`,
    });
}
//获取耗时过半的任务
export function getOverTask() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getOverdueTaskList&sid=${getSid()}`,
    });
}
