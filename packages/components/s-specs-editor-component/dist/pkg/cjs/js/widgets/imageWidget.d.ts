export default class SSpecsEditorComponentImageWidget {
    _component: any;
    _propObj: any;
    _path: any;
    static isActive(): boolean;
    constructor({ component, propObj, path }: {
        component: any;
        propObj: any;
        path: any;
    });
    validate({ values }: {
        values: any;
    }): void;
    render({ propObj, values, path }: {
        propObj: any;
        values: any;
        path: any;
    }): import("lit-html").TemplateResult<1>;
    _renderImage(url: string, media: string, path: string[]): any;
}
