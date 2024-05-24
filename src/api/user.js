import axios from "@/axios.js";
import isDev from "@/config";
import { getSid } from "@/utils";
import { post, get, postForm } from "@/awsuiAxios/index.js";
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
export function loginOutApi(data) {
  return post({
    cmd: "com.awspaas.user.apps.complex_task_decomposition_logOut",
    data: data,
  });
}

// 下载
export function exportFile(url, fileName) {
  const link = document.createElement("a");
  const body = document.querySelector("body");
  link.href = url;
  link.download = fileName;
  // fix Firefox
  link.style.display = "none";
  body.appendChild(link);
  link.click();
  body.removeChild(link);
}
