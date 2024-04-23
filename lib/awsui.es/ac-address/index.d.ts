import { App } from "vue";
import acAddress from "./src/ac-address.vue";
declare interface acOption {
    sid: '';
    width: number;
    resourceId: string;
    resourceType: string;
    assignmentTypes?: string;
    groupType: string;
    title: string;
    permissionType: string;
    accessModeScope: string;
    isRestrict: Boolean;
    callback?: (acList: any) => void;
}
declare const openAc: (options: acOption) => void;
declare const closeAc: () => void;
export { acOption, openAc, closeAc, acAddress };
declare const _default: {
    install: (app: App) => void;
    openAc: (options: acOption) => void;
    closeAc: () => void;
    acAddress: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
};
export default _default;
