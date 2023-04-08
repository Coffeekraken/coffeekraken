import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentTextWidget extends __SSpecsEditorWidget {
    static isActive(): boolean;
    constructor(deps: ISSpecsEditorWidgetDeps);
    validate(newValues: any): {
        error: string;
    };
    render(): import("lit-html").TemplateResult<1>;
}
