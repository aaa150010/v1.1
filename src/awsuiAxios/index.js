import axios from "axios";
import store from "../store";
import { getSid } from "@/utils/index.js";
import isDev from "@/config/index.js";
import { message } from "ant-design-vue";

axios.defaults.baseURL = typeof axiosBaseUrl == "undefined" ? "" : axiosBaseUrl; // 设置跨域代理接口统一的前置地址

// 添加请求拦截器
axios.interceptors.request.use(
  function (request) {
    // 在发送请求之前做些什么
    // if (request.method == "post") {
    //   request.params = {};
    // }
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
      message.info(
        response.data.data.desc ? response.data.data.desc : "你暂无权限"
      );
    } else if (response.data.errorCode == "400") {
      message.info(response.data.data.desc);
    } else if (response.data.errorCode == "499") {
      message.info(response.data.data.desc);
    } else if (response.data.errorCode == "500") {
      message.error(response.data.data.desc);
    } else if (response.data.errorCode == "800") {
      message.info("当前操作过快或访问人数过多，请稍后访问！");
    } else if (
      response.data.result != "ok" &&
      (!response.data.data || response.data.data.result != "ok")
    ) {
      if (response.data.msg) {
        message.error(response.data.msg);
      } else {
        message.error("系统错误");
      }
    }
    store.commit("setLoading", false);
    return response.data;
  },
  function (error) {
    if (error.response == null) {
      throw error;
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
  return axios({
    method: "get",
    url: "/jd",
    isLoading: params.isLoading ? true : false,
    params: { ...params.data, sid: getSid(), cmd: params.cmd },
  });
};

const post = (params) => {
  let postConfig = {
    method: "post",
    url: "/jd",
    data: params.data,
    isLoading: params.isLoading ? true : false,
  };
  let my_params = { sid: getSid(), cmd: params.cmd };
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
  let my_params = {
    ...params.config,
    sid: getSid(),
  };
  postConfig.url = postConfig.url + "?" + _toChangeData(my_params);
  return axios(postConfig);
};
export { get, post, postForm };
