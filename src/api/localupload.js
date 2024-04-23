import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//上传文件
export function uploadFile(file) {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}uf`
    return axios({
        method: "post",
        url:  `${apiBasePath}?appId=com.awspaas.user.apps.complex_task_decomposition&sid=${getSid()}&groupValue=dir1&fileValue=dir2&repositoryName=myfile`,
        data:{file},
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}