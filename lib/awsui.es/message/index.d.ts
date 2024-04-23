import "./css.css";
declare let _common: any;
export default _common;
export { _common };
export declare function messageObject(): {
    message: import("element-plus/es/utils/types").SFCWithInstall<import("element-plus").IMessage>;
    messageBox: import("element-plus/es/utils/types").SFCWithInstall<import("element-plus").IElMessageBox>;
};
export declare function message(options: any): import("element-plus").IMessageHandle;
export declare function messageSuccess(options: any): import("element-plus").IMessageHandle;
export declare function messageWarning(options: any): import("element-plus").IMessageHandle;
export declare function messageError(options: any): import("element-plus").IMessageHandle;
export declare function msgbox(options: any): Promise<import("element-plus").MessageBoxData>;
export declare function alert(message: any, title: any, options: any): Promise<import("element-plus").MessageBoxData>;
export declare function confirm(message: any, title: any, options: any): Promise<import("element-plus").MessageBoxData>;
export declare function prompt(message: any, title: any, options: any): Promise<import("element-plus").MessageBoxData>;
export declare function MessageWarning(text?: string): void;
export declare function MessageBoxWarning(text?: string): Promise<import("element-plus").MessageBoxData>;
