export default class SSpecsEditorComponentImageWidget {
    _error: any;
    _warning: any;
    _component: any;
    _propObj: any;
    _path: any;
    static isActive(): boolean;
    constructor({ component, propObj, path }: {
        component: any;
        propObj: any;
        path: any;
    });
    render({ propObj, values, path }: {
        propObj: any;
        values: any;
        path: any;
    }): {
        error: any;
        warning: any;
        html: import("lit-html").TemplateResult<1>;
    };
    _renderImage(url: string, media: string, path: string[]): any;
}
