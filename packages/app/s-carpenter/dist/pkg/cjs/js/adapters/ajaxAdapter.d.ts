declare const _default: {
    load({ dotpath, values, component }: {
        dotpath: any;
        values: any;
        component: any;
    }): Promise<HTMLElement>;
    change({ dotpath, values, component, $elm }: {
        dotpath: any;
        values: any;
        component: any;
        $elm: any;
    }): Promise<HTMLElement>;
    getData({ $elm }: {
        $elm: any;
    }): Promise<any>;
    setValues({ $elm, values, dotpath, component, }: {
        $elm: any;
        values: any;
        dotpath: any;
        component: any;
    }): Promise<HTMLElement>;
};
export default _default;
