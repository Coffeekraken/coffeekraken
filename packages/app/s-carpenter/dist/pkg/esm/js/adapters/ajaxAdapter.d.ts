declare const _default: {
    load({ dotpath, props, component }: {
        dotpath: any;
        props: any;
        component: any;
    }): Promise<HTMLElement>;
    change({ dotpath, props, component, $elm }: {
        dotpath: any;
        props: any;
        component: any;
        $elm: any;
    }): Promise<HTMLElement>;
    getProps({ $elm }: {
        $elm: any;
    }): Promise<any>;
    setProps({ $elm, props, component }: {
        $elm: any;
        props: any;
        component: any;
    }): Promise<HTMLElement>;
};
export default _default;
