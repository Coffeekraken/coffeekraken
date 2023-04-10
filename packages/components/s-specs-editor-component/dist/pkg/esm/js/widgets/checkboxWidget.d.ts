import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentCheckboxWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps);
    validate(newValues: any): {
        error: string;
    };
    render(): import("lit-html").TemplateResult<1>;
}
