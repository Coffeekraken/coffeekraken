export default function (component: any): {
    isActive(): boolean;
    render({ propObj, values, path }: {
        propObj: any;
        values: any;
        path: any;
    }): {
        error: any;
        warning: any;
        html: import("lit-html").TemplateResult<1>;
    };
};
