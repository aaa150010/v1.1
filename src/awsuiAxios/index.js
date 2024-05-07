import axios from "axios";
import store from "../store";
import { GetSettingParam } from "@/common/index.js";
import isDev from "@/config/index.js";
import { ElMessage } from "element-plus";
// 创建axios请求实例
// const request = axios.create({
//     baseURL: axiosBaseUrl,
//     timeout: 1000,
//     headers: {
//         'Content-Type': 'application/json; charset=utf-8'
//     }
// })
// console.log(898989);
axios.defaults.baseURL = typeof axiosBaseUrl == "undefined" ? "" : axiosBaseUrl; // 设置跨域代理接口统一的前置地址
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded; charset=utf-8";

// 添加请求拦截器
axios.interceptors.request.use(
  function (request) {
    // 在发送请求之前做些什么
    if (request.method == "post") {
      request.params = {};
    }
    if (request.isLoading) {
      store.commit("setLoading", true);
    }
    return request;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 只返回数据
    // console.log(response, "测试拦截器");
    if (response.data.errorCode == "403") {
      ElMessage.info(
        response.data.data.desc ? response.data.data.desc : "你暂无权限"
      );
    } else if (response.data.errorCode == "400") {
      ElMessage.info(response.data.data.desc);
    } else if (response.data.errorCode == "499") {
      ElMessage.info(response.data.data.desc);
    } else if (response.data.errorCode == "500") {
      ElMessage.error(response.data.data.desc);
    } else if (response.data.errorCode == "800") {
      ElMessage.info("当前操作过快或访问人数过多，请稍后访问！");
    } else if (
      response.data.result != "ok" &&
      response.data.data.result != "ok"
    ) {
      ElMessage.error("系统错误");
    }

    store.commit("setLoading", false);

    return response.data;
  },
  function (error) {
    if (error.response == null) {
      throw error;
    }
    const status = error.response.status;
    if (status >= 500) {
      alert("服务繁忙请稍后再试");
    } else if (status >= 400) {
      alert(error.response.data.message);
    }
    // 对响应错误做点什么
    console.dir(error);
    return Promise.reject(error);
  }
);

function _toChangeData(data) {
  let dataArray = [];
  for (let key in data) {
    dataArray.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    );
  }
  return dataArray.join("&");
}

//可能需要更改，暂时用不到
const get = (params) => {
  // console.log(store.state);
  return axios({
    method: "get",
    url: params.url,
    isLoading: params.isLoading ? true : false,
    params: !isDev
      ? { ...params.data, sid: GetSettingParam().sessionID }
      : { ...params.data, sid: store.state.sessionId },
  });
};

const post = (params) => {
  let postConfig = {
    method: "post",
    url: params.url,
    data: params.data,
    isLoading: params.isLoading ? true : false,
  };
  //从vuex中获取sessionId
  // postConfig.data.sid = store.state.sessionId;
  postConfig.data.sid = GetSettingParam().sessionID;
  let my_params;
  if (!isDev) {
    my_params = { sid: GetSettingParam().sessionID, cmd: params.data.cmd };
  } else {
    my_params = { sid: store.state.sessionId, cmd: params.data.cmd };
  }
  postConfig.url = postConfig.url + "?" + _toChangeData(my_params);
  return axios(postConfig);
};
const postForm = (params) => {
  let postConfig = {
    method: "post",
    url: "/uf",
    data: params.data,
    isLoading: params.isLoading ? true : false,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  //从vuex中获取sessionId
  // postConfig.data.sid = store.state.sessionId;
  // postConfig.data.sid = GetSettingParam().sessionID;
  let my_params;
  if (!isDev) {
    my_params = {
      sid: GetSettingParam().sessionID,
      appId: "com.awspaas.user.apps.management_two",
      groupValue: "dir1",
      fileValue: "dir2",
      repositoryName: "myfile",
      extParam: "",
    };
  } else {
    my_params = {
      sid: store.state.sessionId,
      appId: "com.awspaas.user.apps.management_two",
      groupValue: "dir1",
      fileValue: "dir2",
      repositoryName: "myfile",
      extParam: "",
    };
  }
  postConfig.url = postConfig.url + "?" + _toChangeData(my_params);
  return axios(postConfig);
};

const aslp = (params) => {
  // {
  //     portalUrl : "",
  //     authentication : store.state.sessionId,
  //     sourceAppId : "appid",
  //     aslp : "aslp://XXXX",
  //     params :{
  //         aa:1,
  //         bb:2
  //     }
  // }
  let datas = {
    authentication: store.state.sessionId,
    sourceAppId: params.sourceAppId,
    aslp: params.aslp,
  };
  Object.assign(datas, params.params);
  let postConfig = {
    method: "post",
    url: params.portalUrl,
    params: datas,
  };
  postConfig.data = _toChangeData(postConfig.data);
  return axios(postConfig);
};
// const delete = (url, data) => request.delete(url, data)
// const head = (url, data) => request.head(url, data)
// const options = (url, data) => request.options(url, data)
// const put = (url, data) => request.put(url, data)
// const patch = (url, data) => request.patch(url, data)
export { get, post, aslp, postForm };
// export default get;
