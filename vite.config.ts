import {defineConfig,} from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from "fs-extra"
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
declare const require: any;
declare const process: any;
const path = require("path");

const AWSDevParams = require("./AWSDevParams");
Object.assign(AWSDevParams, require("./AWSDevServiceParams"));
const AWSReleasePath = AWSDevParams.AWSReleasePath;
const AWSPortalUrl = AWSDevParams.AWSPortalUrl;
//开发时通过用户名及密码获取sessionId
const devUserInfo = AWSDevParams.devUserInfo;
const AWSproxyPath = "/AWSDEVURL/r/"; //防止跨域的地址
const moduleTemplateInAWS = AWSDevParams.moduleTemplateInAWS;//平台的模板路径
const outputDir = AWSDevParams.outputDir;
const publicPath = AWSDevParams.publicPath;//决定生成在平台的js或css的相对路径,与build配置的路径要对应
//判断是否开发
const isProduction = process.env.NODE_ENV === "production";
//开发时路径和build到平台路径
const AWSJSAndCSSPath = isProduction ? "../" : AWSproxyPath.replace("r/", "");
const importAWSCSS = AWSDevParams.importAWSCSS == null ? [] : AWSDevParams.importAWSCSS;
const importAWSJS = AWSDevParams.importAWSJS == null ? [] : AWSDevParams.importAWSJS;
const AWSJSAndCSSImportArray = [] as any[];
for (const k of importAWSCSS) {
    AWSJSAndCSSImportArray.push("<link type='text/css' rel='stylesheet' href='" + AWSJSAndCSSPath + k + "'/>");
}
for (const k of importAWSJS) {
    AWSJSAndCSSImportArray.push("<script type='text/javascript' src='" + AWSJSAndCSSPath + k + "'></script>");
}
const getAWSFileRelativePath = () => {
    let index = "./";
    if (isProduction) {
        index = publicPath;
    }
    return index;
};
const getIndexPath = () => {
    let index = "index.html";
    if (isProduction) {
        index = AWSReleasePath + moduleTemplateInAWS;
    }
    return index;
};

const data = {
    AWSJSAndCSSImport: AWSJSAndCSSImportArray.join("\n"),
    AWSJSAndCSSPath,
    devUserInfo: isProduction ? {} : devUserInfo,
    publicDir: getAWSFileRelativePath(),
    isProduction,
    axiosBaseUrl: isProduction ? "./" : AWSproxyPath,
    settingParam: isProduction ? "<#settingParam>" : "{}",
}
const replaceHtml = (html: string, htmlMap: any) => {
    for (const key in htmlMap) {
        if (key == "publicDir") {
            //公共路径特殊处理
            html = html.replace(/\/\$\{publicDir\}(.*?)"/g, htmlMap[key]+"$1\"");
        } else {
            html = html.replace(new RegExp("\\$\\{" + key + "\\}", "g"), typeof htmlMap[key] == "object" ? JSON.stringify(htmlMap[key]) : htmlMap[key]);
        }
    }
    return html;
}


const AWSPlugin: any = () => {
    let config = null as any;
    return {
        name: 'read-config',

        configResolved(resolvedConfig: any) {
            // 存储最终解析的配置
            config = resolvedConfig;
        },

        // 在其他钩子中使用存储的配置
        transform() {
            if (config.command === 'serve') {
                // serve: 由开发服务器调用的插件
            } else {
                // build: 由 Rollup 调用的插件
            }
        },
        transformIndexHtml(html: string) {
            return replaceHtml(html, data);
        },
        renderChunk(code: string, model: any) {
            if (/\/\$\{publicDir\}\//.test(code)) {
                return code.replace(/\/\$\{publicDir\}\//g, data["publicDir"] + "/");
            }
            return code;
        },
        closeBundle() {
            fs.move(AWSReleasePath + outputDir + "/index.html", getIndexPath(), {
                overwrite: true
            });
            // fs.rename(resolve(filePath + "/style.css"), resolve(filePath + "/awsui.css"));
            // fs.rename(resolve(filePath + "/awsui.umd.js"), resolve(filePath + "/awsui.umd.min.js"));
        },
    }
}

const rollupPlugin = () => {
    return {
        name: 'rullupPlugin',
        renderChunk(code: string, model: any) {
            //去除js中的css文本串
            for (const key in model.modules) {
                if (/\.(css|less)$/.test(key)) {
                    code = code.replace(model.modules[key].code, "");
                }
            }
            return code;
        },
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    // root: getIndexPath(),
    // publicDir: getAWSFileRelativePath(),
    //生成入口的html文件位置
    base: isProduction ? "${publicDir}" : "/", //公共路径特殊处理
    build: {
        outDir: AWSReleasePath + outputDir,
        emptyOutDir: true,
        // sourcemap:"inline",
        minify: "esbuild", //esbuild更快大一点点，terser慢但仅小一点点
        cssCodeSplit: false,
        commonjsOptions: {
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: ['node_modules/**', "plugins/**", "lib/**", "src/**"],  // Default: undefined
            exclude: ['node_modules/foo/**', 'node_modules/bar/**'],  // Default: undefined
            // these values can also be regular expressions
            // include: /node_modules/

            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            extensions: ['.js', '.coffee'],  // Default: [ '.js' ]

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false,  // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: false,  // Default: true

            // unconverted. Pass an array containing the IDs
            // or a `id => boolean` function. Only use this
            // option if you know what you're doing!
            ignore: ['conditional-runtime-dependency']
        },
        rollupOptions: {
            output: {
                assetFileNames : 'assets/asset-[name]-[hash][extname]',
                chunkFileNames: 'js/chunck-[name]-[hash].js',
                entryFileNames: 'js/entry-[name]-[hash].js'
            },
            plugins: [rollupPlugin()]
        }
    },
    // eslint-loader 是否在保存的时候检查
    // lintOnSave: true,
    // productionSourceMap: false, //打包不使用源码（false后在平台无法调试）
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    resolve: {
        alias: {
            "@": path.resolve(__dirname as any, "./src")
        }
    },
    server: {
        host : "0.0.0.0",
        proxy: {
            //配置跨域
            "/AWSDEVURL": {
                target: AWSPortalUrl,
                ws: true,
                changeOrigin: true, //允许跨域
                rewrite: (path) => path.replace(/^\/AWSDEVURL/, '')
            }
        }
    },
    plugins: [vue(), AWSPlugin(),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
        }),
    ],
})
