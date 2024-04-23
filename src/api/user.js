import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//获取个人信息
export function getUserInfo() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition_getUserInfo&sid=${getSid()}`,
    });
}