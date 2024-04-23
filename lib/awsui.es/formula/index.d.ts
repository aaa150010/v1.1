declare interface formulaOption {
    url: string;
    data: {
        sid: string;
        cmd: string;
        contextData: string;
    };
    callback?: (acList: any) => void;
}
declare const _default: {
    openFormula: (options: formulaOption) => void;
    closeFormula: () => void;
};
export default _default;
