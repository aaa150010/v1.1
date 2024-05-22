module.exports = {
  moduleTemplateInAWS:
    "apps/install/com.awspaas.user.apps.management_two/template/page/vue.htm" /*apps/install/_bpm.platform/template/page/console.m.dw.design.vue.htm*/, //build后生成到平台的模板位置及名称
  outputDir:
    "apps/install/com.awspaas.user.apps.management_two/web/com.awspaas.user.apps.management_two/main" /*webserver/webapps/portal/apps/_bpm.platform/dw/designer/main*/, //build后js或css生成到平台的位置
  publicPath:
    "../apps/com.awspaas.user.apps.management_two/main" /*../apps/_bpm.platform/dw/designer/main*/, //build到平台后生成到模板中，引入js文件的相对平台的位置
  importAWSCSS: [
    //引入平台的css，在portal目录开始,开发或build通用
    "commons/css/font/iconfont.css",
  ],
  importAWSJS: [
    //引入平台的js
    // 示例
    // "commons/js/jquery/scripts/ui/echarts/echarts.min.js",
    // "commons/js/jquery/scripts/ui/echarts/mapJsonJs/china.js",
    // "commons/js/jquery/scripts/ui/echarts/theme/white_bg.js",
    // "commons/js/jquery/scripts/ui/echarts/walden.js",
    // "commons/js/jquery/scripts/ui/echarts/theme/black_bg.js",
    //"commons/js/util/Base64.js",
  ],
};
