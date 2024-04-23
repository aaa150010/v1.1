declare interface addressOption {
    data: {
        value: string;
        address: string;
        sid: string;
        appId: string;
        addressDomId: string;
        formData: string;
        width: Number;
        height: Number;
        cmd: string;
        title: string;
    };
    url: string;
    type: string;
}
declare const _default: {
    openAddress: (options: addressOption) => void;
    closeAddress: () => void;
};
export default _default;
