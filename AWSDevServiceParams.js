module.exports = {
  // AWSPortalUrl: "http://localhost:8088/portal/", //aws平台启动地址，用于开发时获取平台静态资源，请求数据等（注意最后的/,不要删）
  AWSPortalUrl: "http://192.168.0.61:8088/portal/",
  //aws平台启动地址，用于开发时获取平台静态资源，请求数据等（注意最后的/,不要删）
  // AWSPortalUrl: "http://192.168.0.47:8088/portal/", //aws平台启动地址，用于开发时获取平台静态资源，请求数据等（注意最后的/,不要删）
  AWSReleasePath: "D:/Actionsoft/release/" /*C:/work/workspace/release/*/, //aws的平台路径，暂时写绝对路径，用于build生成的主文件位置（注意最后的/,不要删）
  devUserInfo: {
    //开发时通过用户名及密码获取sessionId，！！前提必须需要安装并启动app：com.actionsoft.apps.getsession.app
    userid: "admin", //具有后台管理的用户名
    pwd: "bz888", //密码
    deviceType: "pc",
  },
};
