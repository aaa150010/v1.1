declare module 'axios' {
    interface AxiosRequestConfig {
        alert?: boolean;
        result: string;
    }
}
declare module 'axios' {
    interface AxiosResponse {
        result: string;
    }
}
declare const _default: {
    config: (AWSPageContext: any) => void;
    get(params: any): void;
    post<T = any>(params: {
        url: string;
        data: T;
    }): Promise<import("axios").AxiosResponse<any>>;
    aslp(params: any): Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
