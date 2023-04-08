import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentWysiwygWidget extends __SSpecsEditorWidget {
    _editorJs: any;
    _frontspec: any;
    _$holder: any;
    _$add: any;
    static isActive(): boolean;
    constructor(deps: ISSpecsEditorWidgetDeps);
    render(): import("lit-html").TemplateResult<1>;
}
