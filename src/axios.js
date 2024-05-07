import axios from "axios";
import {message} from "ant-design-vue";
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  //   timeout:5000
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
      // &&res.data.data.result!=='ok'
      if (res.data.result!=='ok'){
          message.error(res.data.msg?res.data.msg:res.data.desc);
      }

    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
