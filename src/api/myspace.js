import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//获取我的空间资源
export function getTreeData(space,type,isDeep,parent) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getResource&sid=${getSid()}&space=${space}&type=${type}&isDeep=${isDeep}&parent=${parent}`,
    });
}
//获取我的空间资源
export function addFolder(list) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_createResource&sid=${getSid()}`,
        data:list
    });
}