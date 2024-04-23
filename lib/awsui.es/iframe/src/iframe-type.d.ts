declare interface iframeOption {
    /**
     *地址
     */
    url: string;
    /**
     *数据
     */
    data?: any;
    /**
     *宽
     */
    width?: string;
    /**
     *高
     */
    height?: string;
    /**
     *是否使用滚动条
     */
    scrolling?: string;
    /**
     *请求方式
     */
    type?: "get" | "post" | string;
    /**
     * 加载页面后回调
     */
    onload?: () => void;
}
export { iframeOption };
