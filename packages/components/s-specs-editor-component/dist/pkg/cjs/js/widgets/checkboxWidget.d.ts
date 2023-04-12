import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
import { __SCheckbox } from '@specimen/types/utils';
export default class SSpecsEditorComponentCheckboxWidget extends __SSpecsEditorWidget {
    _checkbox: __SCheckbox;
    constructor(deps: ISSpecsEditorWidgetDeps);
    validate(newValues: any): {
        error: string;
    };
    render(): import("lit-html").TemplateResult<1>;
}
