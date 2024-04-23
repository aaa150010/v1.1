import 'element-plus/dist/index.css';
import 'dayjs/locale/zh-cn';
import { App } from "vue";
declare const _default: {
    Element: {
        version: string;
        install: (app: App<any>, opts: import("element-plus/lib/utils/config").InstallOptions) => void;
    };
    install(app: App): void;
};
export default _default;
