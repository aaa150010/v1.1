import type { App } from "vue";
declare const tools: {
    /**
     * 获取const变量，不存在时返回指定的默认值
     * @name 变量名称
     * @defaultValue 默认值
     *
     */
    getConstByName<T = any>(name: string, defaultValue: T): T;
    /**
     * 获取一个36位的ID字符串
     */
    uuid(): string;
    /**
     * 获取唯一顺序号（全局，每次调用自加1）
     * @param type 如果设定了类别，则指在此类别下自加1
     */
    getCountIndex(type?: string | undefined): number;
    /**
     * 判断字符串不为空且不是undefined
     */
    isNotNull(str: string): boolean;
    /**
     * 判断字符串为空或为undefined
     */
    isNull(str: string): boolean;
    /**
     * 判断Object对象是否为空，返回Boolean
     */
    isNotNullObject(obj: any): boolean;
    /**
     * 查询某个Object对象在Array中的索引值
     */
    queryObjectInArrayIndex(arr: string[], objKey: any, filed: string): number;
    /**
     * 获取offset，类似Jquery的offset方法
     * @param elem DOM对象
     *
     */
    getOffset: (elem: HTMLElement) => {
        top: number;
        left: number;
        height: number;
        width: number;
    };
    /**
     * 添加dom的样式
     * @param toDom 要移除的DOM对象
     * @param cls 样式名称
     *
     */
    addCls: (toDom: HTMLElement, cls: string) => void;
    /**
     * 移除dom的样式
     * @param toDom 要移除的DOM对象
     * @param cls 样式名称
     *
     */
    removeCls: (toDom: HTMLElement, cls: string) => void;
    _buildIndex(baseId: string, ...args: any[]): string;
    /**
     * 转换指定格式日期字符串
     * @params date 日期格式
     * @params fmt 指定格式字符串
     */
    formatDate(date: Date, fmt: string): string;
    /**
     * 生成树解构Id，判断children，递归生成，用~隔开
     * @param item 生成到此对象上
     * @param baseId 依据此ID进行生成
     * @param number 内部参数，无需传入
     *
     */
    generMenuId(item: any, baseId: string, i?: number | null | undefined): void;
    /**
     * 获取浏览器版本
     */
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
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        awsuiTools: typeof tools;
    }
}
export { tools };
declare const _default: {
    tools: {
        /**
         * 获取const变量，不存在时返回指定的默认值
         * @name 变量名称
         * @defaultValue 默认值
         *
         */
        getConstByName<T = any>(name: string, defaultValue: T): T;
        /**
         * 获取一个36位的ID字符串
         */
        uuid(): string;
        /**
         * 获取唯一顺序号（全局，每次调用自加1）
         * @param type 如果设定了类别，则指在此类别下自加1
         */
        getCountIndex(type?: string | undefined): number;
        /**
         * 判断字符串不为空且不是undefined
         */
        isNotNull(str: string): boolean;
        /**
         * 判断字符串为空或为undefined
         */
        isNull(str: string): boolean;
        /**
         * 判断Object对象是否为空，返回Boolean
         */
        isNotNullObject(obj: any): boolean;
        /**
         * 查询某个Object对象在Array中的索引值
         */
        queryObjectInArrayIndex(arr: string[], objKey: any, filed: string): number;
        /**
         * 获取offset，类似Jquery的offset方法
         * @param elem DOM对象
         *
         */
        getOffset: (elem: HTMLElement) => {
            top: number;
            left: number;
            height: number;
            width: number;
        };
        /**
         * 添加dom的样式
         * @param toDom 要移除的DOM对象
         * @param cls 样式名称
         *
         */
        addCls: (toDom: HTMLElement, cls: string) => void;
        /**
         * 移除dom的样式
         * @param toDom 要移除的DOM对象
         * @param cls 样式名称
         *
         */
        removeCls: (toDom: HTMLElement, cls: string) => void;
        _buildIndex(baseId: string, ...args: any[]): string;
        /**
         * 转换指定格式日期字符串
         * @params date 日期格式
         * @params fmt 指定格式字符串
         */
        formatDate(date: Date, fmt: string): string;
        /**
         * 生成树解构Id，判断children，递归生成，用~隔开
         * @param item 生成到此对象上
         * @param baseId 依据此ID进行生成
         * @param number 内部参数，无需传入
         *
         */
        generMenuId(item: any, baseId: string, i?: number | null | undefined): void;
        /**
         * 获取浏览器版本
         */
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
    install(app: App): void;
};
export default _default;
