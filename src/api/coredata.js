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
export function getSchool(province) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_querySchoolList&sid=${getSid()}&province=${province}`,
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
//判断是否有修改权限以及获取数据
export function getSchoolCoreDataItemTree(schoolCode,year) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getSchoolCoreDataItemTree&sid=${getSid()}&schoolCode=${schoolCode}&year=${year}`,
    });
}
//点击数据填报获取数据
export function getCoreDataItemTree() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getCoreDataItemTree&sid=${getSid()}`,
    });
}
//新增学校
export function addSchoolData(obj) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_createSchool&sid=${getSid()}`,
        data:obj
    });
}
//数据填报的新增或修改
export function fillCoreData(schoolCode,year,schoolData) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_fillCoreData&sid=${getSid()}`,
        data:{
            schoolCode,
            year,
            schoolData
        }
    });
}