export default class SSpecsEditorComponentSelectWidget {
    _component: any;
    _propObj: any;
    _path: any;
    static isActive(): boolean;
    constructor({ component, propObj, path }: {
        component: any;
        propObj: any;
        path: any;
    });
    validate({ propObj, values }: {
        propObj: any;
        values: any;
    }): {
        error: string;
    };
    render({ propObj, values, path }: {
        propObj: any;
        values: any;
        path: any;
    }): import("lit-html").TemplateResult<1>;
}
