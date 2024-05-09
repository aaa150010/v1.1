import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//获取年份
export function getYears() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getYear&sid=${getSid()}`,
    });
}
//获取省份
export function getProvince() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getProvince&sid=${getSid()}`,
    });
}
//获取省份
export function getSchool() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_querySchoolList&sid=${getSid()}`,
    });
}
//获取树形数据
export function getTreeData() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getCoreDataItemTree&sid=${getSid()}`,
    });
}
//根据四个参数查询数据
export function getByFileds(year,province,schoolCode,itemList) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getCoreData&sid=${getSid()}`,
        data:{
            year,
            province,
            schoolCode,
            itemList
        }
    });
}