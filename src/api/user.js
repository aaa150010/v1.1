import axios from "@/axios.js";
import isDev from "@/config";
import { getSid } from "@/utils";
//获取个人信息
export function getUserInfo() {
  let apiBasePath = `${isDev ? "AWSDEVURL/r/" : "/portal/r/"}jd`;
  return axios({
    method: "post",
    url: `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition_getUserInfo&sid=${getSid()}`,
  });
}

//根据id获取个人信息
export function getUserInfoByInfo(uid) {
  let apiBasePath = `${isDev ? "AWSDEVURL/r/" : "/portal/r/"}jd`;
  return axios({
    method: "post",
    url: `${apiBasePath}?cmd=com.awspaas.user.apps.complex_task_decomposition_getUserInfoById&sid=${getSid()}&uid=${uid}`,
  });
}

//根据id获取退出登入
export function loginOutApi() {
  let apiBasePath = `${isDev ? "AWSDEVURL/r/" : "/portal/r/"}jd`;
  return axios({
    method: "get",
    url: `${apiBasePath}?cmd=CLIENT_USER_INFO_LOGOUT&sid=${getSid()}`,
  });
}
