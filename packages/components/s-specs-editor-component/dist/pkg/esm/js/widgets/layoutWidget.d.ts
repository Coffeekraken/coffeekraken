import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export interface ISSpecsEditorComponentLayoutWidgetLayoutObj {
    id: string;
    layout: string;
}
export default class SSpecsEditorComponentLayoutWidget extends __SSpecsEditorWidget {
    _renderedLayouts: {};
    _sMedia: any;
    constructor(deps: ISSpecsEditorWidgetDeps);
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    _renderLayout(layoutObj: any, media: string): any;
}
