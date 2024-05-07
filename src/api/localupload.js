import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//上传文件
export function uploadFile(file) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}uf`
    return axios({
        method: "post",
        url:  `${apiBasePath}?appId=com.awspaas.user.apps.complex_task_decomposition&sid=${getSid()}&groupValue=dir1&fileValue=dir2&repositoryName=myfile&extParam=`,
        data:{file},
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
//获取目录树
export function getTreeData(space) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getSpace&sid=${getSid()}&space=${space}&type=文件夹&isDeep=true`,
    });
}