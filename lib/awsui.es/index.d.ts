declare module 'axios' {
    interface AxiosResponse {
        result: string;
    }
}
import { App } from "vue";
import ElementUI from "./ele/index";
import "../static/css/reset.css";
import "../static/css/public.css";
import type { InstallOptions } from 'element-plus/packages/utils/config';
import AwsuiCodemirror from "./codemirror/index";
import axios from "./api/awsAxios";
import getSid from "./utils/sid";
import tools from "./utils/tools";
declare const CodeMirror: any;
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        AWSPageContext?: {
            devUserInfo?: any;
            formulaLabelMap?: any;
            settingParam?: any;
            axiosBaseUrl?: string;
            production?: boolean;
            iconfontMap?: any;
        };
    }
}
declare const install: (app: App, opt: InstallOptions) => void;
import AwsuiFormulaDialog from "./formula/index";
export { CodeMirror, AwsuiCodemirror, install, AwsuiFormulaDialog, ElementUI, getSid, tools, axios };
declare const _default: {
    HelloWorld: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
    CodeMirror: any;
    AwsuiCodemirror: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
    install: (app: App<any>, opt: InstallOptions) => void;
    ElementUI: {
        Element: {
            version: string;
            install: (app: App<any>, opts: import("element-plus/lib/utils/config").InstallOptions) => void;
        };
        install(app: App<any>): void;
    };
    tools: {
        tools: {
            getConstByName<T = any>(name: string, defaultValue: T): T;
            uuid(): string;
            getCountIndex(type?: string | undefined): number;
            isNotNull(str: string): boolean;
            isNull(str: string): boolean;
            isNotNullObject(obj: any): boolean;
            queryObjectInArrayIndex(arr: string[], objKey: any, filed: string): number;
            getOffset: (elem: HTMLElement) => {
                top: number;
                left: number;
                height: number;
                width: number;
            };
            addCls: (toDom: HTMLElement, cls: string) => void;
            removeCls: (toDom: HTMLElement, cls: string) => void;
            _buildIndex(baseId: string, ...args: any[]): string;
            formatDate(date: Date, fmt: string): string;
            generMenuId(item: any, baseId: string, i?: number | null | undefined): void;
            getBrowser(): {
                isStrict: boolean;
                isOpera: boolean;
                isSafari: boolean;
                isIE: boolean;
                isIE6: boolean;
                isIE7: boolean;
                isIE8: boolean;
                isIE9: boolean;
                isIE10: boolean;
                isIE11: boolean;
                isGecko: boolean;
                isFirefox: boolean;
                isChrome: boolean;
                isBorderBox: boolean;
                isWindows: boolean;
                isMac: boolean;
                isAir: boolean;
                isLinux: boolean;
                isSecure: boolean;
                isIPhone: boolean;
                isIPhoneX: boolean;
                isIPad: boolean;
                isAWSMobilePortalApp: boolean;
                isAndroid: boolean;
                isDingtalk: boolean;
                isWechat: boolean;
                isWxWork: boolean;
                isFeishu: boolean;
                isWeLink: boolean;
                isMobile: boolean;
            };
        };
        install(app: App<any>): void;
    };
    getSid: {
        exec(app: App<any>): Promise<void>;
    };
    axios: {
        config: (AWSPageContext: any) => void;
        get(params: any): void;
        post<T_1 = any>(params: {
            url: string;
            data: T_1;
        }): Promise<import("axios").AxiosResponse<any>>;
        aslp(params: any): Promise<import("axios").AxiosResponse<any>>;
    };
};
export default _default;
