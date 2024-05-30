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
  // 使用 split() 方法将 URL 字符串按照 & 分割成数组
  let urlParts = url.split('&');

// 遍历数组,检查每个元素是否以 sid= 开头,如果是则去除
  let newUrlParts = [];
  for (let part of urlParts) {
    if (!part.startsWith('sid=')) {
      newUrlParts.push(part);
    }
  }
// 将处理后的数组重新拼接成新的 URL 字符串
  let newUrl = newUrlParts.join('&');
  let newUrl1=`${newUrl}&sid=${localStorage.getItem('sid')}`
  link.href = newUrl1;
  link.download = fileName;
  // fix Firefox
  link.style.display = "none";
  body.appendChild(link);
  link.click();
  body.removeChild(link);
}
// 遍历循环对象组成新数组
export function getFilterList(objectArray){
  let newArray=[]
  if (objectArray.length>0){
    newArray = objectArray.map(item => ({
      text: item.projectName,
      value: item.projectName
    }));
  }
  let uniqueData = [...new Set(newArray.map(JSON.stringify))].map(JSON.parse)
  return uniqueData
}
// 遍历循环对象组成新数组
export function getFilterList1(objectArray){
  let newArray=[]
  if (objectArray.length>0){
    newArray = objectArray.map(item => ({
      text: item.status,
      value: item.status
    }));
  }
  let uniqueData = [...new Set(newArray.map(JSON.stringify))].map(JSON.parse)
  return uniqueData
}