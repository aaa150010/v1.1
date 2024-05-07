import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//获取我的空间资源
export function getTreeData1(space,type,isDeep) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getSpace&sid=${getSid()}&space=${space}&type=${type}&isDeep=${isDeep}`,
    });
}
//新增文件夹
export function addFolder(parent,permissionType,name) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_createResource&sid=${getSid()}&type=文件夹&parent=${parent}&permissionType=${permissionType}&name=${name}`,
    });
}
//获取某个文件夹下的文件
export function getFolderFiles(parent) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getResource&sid=${getSid()}&space=我的空间&type=all&isDeep=false&parent=${parent}`,
    });
}
//删除文件或者文件夹
export function deleteFolder(resourceCode) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_deleteResource&sid=${getSid()}&resourceCode=${resourceCode}`,
    });
}
//修改文件或者文件夹
export function editFolderOrFile(permissionType,name,resourceCode) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_updateResource&sid=${getSid()}&permissionType=${permissionType}&name=${name}&resourceCode=${resourceCode}`,
    });
}
//移动到
export function removeTo(resourceCode,newParent) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_moveResource&sid=${getSid()}&resourceCode=${resourceCode}&newParent=${newParent}`,
    });
}