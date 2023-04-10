import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentIntegerWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps);
    validate(newValues: any): {
        error: string;
    };
    render(): import("lit-html").TemplateResult<1>;
}
