export default function (component: any): {
    hideOriginals: boolean;
    html({ propObj, values, path }: {
        propObj: any;
        values: any;
        path: any;
    }): import("lit-html").TemplateResult<1>;
    events: {};
};
