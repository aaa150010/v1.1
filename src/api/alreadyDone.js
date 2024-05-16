import axios from "@/axios.js";
import isDev from "@/config";
import {getSid} from "@/utils";
//获取我的已办
export function getDoneTaskList() {
    let apiBasePath=`${isDev?'AWSDEVURL/r/':'/portal/r/'}jd`
    return axios({
        method: "post",
        url:  `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition.controller_getDoneTaskList&sid=${getSid()}`,
    });
}