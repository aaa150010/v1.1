import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//获取我的待办
export function getTodoTaskList() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getTodoTaskList&sid=${getSid()}`,
    });
}
//获取所有资源
export function getAllResource() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getAllResource&sid=${getSid()}`,
    });
}
//点击办理确认事件（反馈）
export function addFeedback(feedback) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition_addFeedback&sid=${getSid()}`,
        data:feedback
    });
}