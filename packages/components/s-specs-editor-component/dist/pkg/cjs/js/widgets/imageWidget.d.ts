import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentImageWidget extends __SSpecsEditorWidget {
    static isActive(): boolean;
    constructor(deps: ISSpecsEditorWidgetDeps);
    render(): import("lit-html").TemplateResult<1>;
    _renderImage(url: string): any;
}
