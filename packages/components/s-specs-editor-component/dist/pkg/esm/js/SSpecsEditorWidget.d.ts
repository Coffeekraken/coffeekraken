import __SSpecsEditorComponent from './SSpecsEditorComponent';
export interface ISSpecsEditorWidgetSetValueSettings {
    path?: string;
    merge?: boolean;
}
export interface ISSpecsEditorWidgetValidateResult {
    error?: string;
    warning?: string;
}
export interface ISSpecsEditorWidgetDeps {
    editor: __SSpecsEditorComponent;
    path: string[];
    values: any;
    propObj: any;
}
export default class SSpecsEditorWidget {
    editor: __SSpecsEditorComponent;
    propObj: any;
    path: string[];
    _values: any;
    _errors: string[];
    _warnings: string[];
    constructor(deps: ISSpecsEditorWidgetDeps);
    get values(): any;
    setValue(value: any, settings?: ISSpecsEditorWidgetSetValueSettings): void;
    validate(values: any): ISSpecsEditorWidgetValidateResult;
    hasValuesForMedia(media: string): boolean;
    hasErrors(): boolean;
    get lastError(): string;
    hasWarnings(): boolean;
    get lastWarning(): string;
}
