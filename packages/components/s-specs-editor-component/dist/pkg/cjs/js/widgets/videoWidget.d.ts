import type { ISVideoData, ISVideoFormat } from '@specimen/types';
export default class SSpecsEditorComponentVideoWidget {
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
    }): import("lit-html").TemplateResult<1>;
    _renderVideos(values: ISVideoData, path: string[]): any;
    _renderVideo(url: string, format: ISVideoFormat, path: string[]): any;
}
