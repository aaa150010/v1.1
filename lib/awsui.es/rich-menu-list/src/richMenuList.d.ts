declare interface menuItem {
    /**
     *唯一标识,必填
     */
    id?: string;
    /**
     *类型
     */
    type?: string;
    /**
     * 这层li的样式
     */
    liStyle?: object;
    /**
     *中间是否显示button
     */
    buttonEdit?: {
        /**
         *点击执行的方法
         */
        exec: (data: menuItem) => void;
    };
    /**
     *点击执行回调
     */
    exec?: (data: menuItem, params?: any) => void;
    /**
     *这一条菜单的名称
     */
    label?: string;
    /**
     * 此条菜单代码层的名称，标识便于查找
     */
    name?: string;
    /**
     * 这个菜单的副标题
     */
    stext?: string;
    /**
     * 此li支持拖拽
     */
    draggable?: boolean;
    /**
     *是否编辑
     */
    editable?: boolean;
    /**
     *编辑时的placeholder
     */
    placeholder?: string;
    /**
     *修改类型
     */
    editType?: string;
    /**
     *针对edit的值
     */
    value?: string;
    /**
     *修改后触发执行
     */
    update?: (data: menuItem | string, params?: any) => void;
    /**
     *是否必填
     */
    required?: boolean;
    /**
     *必填时校验文字 会提示 [requiredName]不允许为空
     */
    requiredName?: string;
    /**
     *菜单前的图标
     */
    icon?: string;
    /**
     *是否选中，如果有此参数则会有选中功能
     */
    checked?: boolean;
    /**
     *组名称
     */
    checkGroup?: string;
    /**
     *是否隐藏
     */
    hidden?: boolean;
    /**
     *是否多选
     */
    multiple?: boolean;
    /**
     *选中回调
     */
    check?: (data: menuItem) => void;
    /**
     *取消选中回调
     */
    uncheck?: (data: menuItem) => void;
    /**
     *子节点支持scroll
     */
    childrenAutoScroll?: boolean;
    /**
     *子节点不显示图标
     */
    childrenNoIcon?: boolean;
    /**
     *slot名称，用于菜单显示slot内容，根节点写对应名字的slot，此节点菜单会渲染此slot
     */
    slot?: string;
    /**
     *是否为活动节点（tabmenu时）
     */
    isActive?: boolean;
    /**
     *专为ac设置服务参数，用于设置完ac后，对stext属性文字的改变
     */
    needChangeState?: any;
    /**
     *声明inputnumber组件
     */
    inputNumber?: {
        /**
         *最大值
         */
        max?: number;
        /**
         *最小值
         */
        min?: number;
        /**
         *后缀选项
         */
        options?: [
            {
                value?: string;
            }
        ];
        /**
         *值
         */
        value?: string;
        symbol?: string;
    };
    titleStyle?: any;
    iconStyle?: any;
    style?: any;
    topLine?: boolean;
    /**
     *用于存放原对象
     */
    baseItem?: any;
    /**
     *是否由菜单打开的组件
     */
    isMenuOpenComponent?: boolean;
    /**
     *如果有子集菜单
     */
    children?: menuItem[];
    /**
     *中间如果存在按钮
     */
    btn?: {
        /**
         *点击方法
         */
        exec?: (data: menuItem) => void;
    };
    /**
     *组件colorpciker配置
     */
    colorPicker?: {
        value?: string;
    };
    /**
     *以下是itemmenu中的属性
     */
    /**
     *允许拖拽
     */
    drag?: boolean;
    /**
     *设置不可用（仅是不可用）
     */
    disable?: boolean;
    /**
     *是否使用不可用的样式（有可能只是使用置灰样式，并不是不可用）
     */
    disableStyle?: boolean;
    /**
     *每个元素的样式，优先级大于option中的
     */
    itemMenuClass?: object;
    /**
     *每个元素的行内样式，优先级大于option中的
     */
    itemMenuStyle?: object;
    /**
     * "last", 固定最后一位，不排序
     */
    fixed?: string;
    /**
     *自定义html
     */
    html?: string;
    /**
     * 显示关闭按钮
     */
    close?: boolean;
}
declare interface transmitItem {
    /**
     *是否根节点
     */
    root?: boolean;
    /**
     *命令子组件展示
     */
    showPop: number;
    /**
     *命令子组件关闭
     */
    closePop: number;
    /**
     *层级
     */
    zIndex?: number;
    /**
     *以此dom进行计算top和left位置
     */
    popToTarget?: HTMLElement;
    /**
     *偏移量
     */
    offset?: number;
    /**
     *dom
     */
    popTarget?: HTMLElement;
    /**
     *允许打开menu
     */
    allowmenu?: boolean;
    /**
     *打开pop时执行
     */
    openPopExec?: () => void;
    /**
     *打开pop时执行
     */
    closePopExec?: () => void;
    /**
     *子节点不显示图标,用于标识下一节点
     */
    childrenNoIcon?: boolean;
    parentValue?: menuItem;
    absoluteLeft?: (obj1: transmitItem, obj2: transmitItem) => number | number;
    absoluteTop?: (obj1: transmitItem, obj2: transmitItem) => number | number;
    /**
     * 离开子菜单（非root）之前事件，返回false则阻止关闭。
     * @param e 事件
     * @param $this 当前vue上下文
     */
    beforeLeaveMenuClose?: (e: Event, $this: any) => boolean;
    /**
     *上下文
     */
    context: {
        /**
         *上一节点
         */
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
        /**
         *根的位置
         */
        rootOffset: {
            top?: number;
            left?: number;
        } | null;
    } | null;
}
declare interface tabMenuItem {
    /**
     *li的样式
     */
    liStyle?: object;
    /**
     *物件的样式
     */
    dstyle?: object;
    /**
     *span的样式（如果存在）
     */
    spanStyle?: object;
    id: string;
    /**
     *暂时 input的值
     */
    value: string;
    hidden?: boolean;
    /**
     *tooltip内容
     */
    tip?: string;
    /**
     *显示右侧线
     */
    showRLine?: boolean;
    /**
     *ui类型
     */
    uiType?: string;
    option?: {
        /**
         *图标 uiType == 'icon'
         */
        icon?: string;
        /**
         *是否圆形 uiType == 'icon'
         */
        circle?: boolean;
        /**
         *uiType == 'button' 按钮名字
         */
        label?: string;
        /**
         *uiType == 'button' 按钮类型
         */
        type?: string;
        /**
         *uiType == 'template' 插槽名字
         */
        name?: string;
        /**
         *li的class样式
         */
        class?: object;
    };
}
/**
 *itemMenu的option描述
 */
declare interface itemMenuOption {
    /**
     *根节点样式
     */
    customClass?: object;
    /**
     *根节点行内样式
     */
    customStyle?: object;
    /**
     *每个元素的样式，优先级小于item中的itemMenuClass
     */
    customItemClass?: object;
    /**
     *每个元素的行内样式，优先级小于item中的itemMenuStyle
     */
    customItemStyle?: object;
    /**
     *可以拖拽
     */
    draggable?: boolean;
    /**
     *是否使用自定义模板（可能废除掉？）
     */
    customTemplate?: boolean;
    /**
     *由于指定个数，每个元素宽度自适应
     */
    columnNum?: number;
    /**
     *用于指定每个元素最小宽度，（如果一行空出多余宽度，则平均加到每个元素的宽度中）
     */
    minWidth?: number;
    /**
     *指定每个元素的外边距，用于计算（依赖于customTemplate为true，是否删掉？）
     */
    marginLeftForColumnNum?: number;
    absoluteLeft?: (obj1: transmitItem, obj2: transmitItem) => number | number;
    absoluteTop?: (obj1: transmitItem, obj2: transmitItem) => number | number;
    /**
     * 离开子菜单（非root）之前事件，返回false则阻止关闭。
     * @param e 事件
     * @param $this 当前vue上下文
     */
    beforeLeaveMenuClose?: (e: Event, $this: any) => boolean;
}
export { menuItem, transmitItem, tabMenuItem, itemMenuOption };
