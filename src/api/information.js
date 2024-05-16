import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//根据类型获取消息
export function getInformationByType(page,type) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition_readMessage&sid=${getSid()}&page=${page}&type=${type}`,
    });
}
//点击查看查询接口添加已读消息
export function addReadMessage(messageCode) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition_addReadMessage&sid=${getSid()}&messageCode=${messageCode}`,
    });
}
//一键删除已读消息
export function addDeleteMessage() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition_addDeleteMessage&sid=${getSid()}}`,
    });
}
//获取未读消息数量
export function getUnreadNumber() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition_getMessageCount&sid=${getSid()}}`,
    });
}