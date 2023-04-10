import type { ISSpecsEditorComponentRenderLabelSettings } from './SSpecsEditorComponent';
import __SSpecsEditorComponent from './SSpecsEditorComponent';
export interface ISSpeceEditorWidgetStatus {
    pristine: boolean;
}
export interface ISSpecsEditorWidgetSetValueSettings {
    media?: string;
    path?: string;
    merge?: boolean;
    noneResponsive?: boolean;
    validate?: boolean;
}
export interface ISSpecsEditorWidgetSettings {
    label?: boolean;
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
    settings: ISSpecsEditorWidgetSettings;
}
export default class SSpecsEditorWidget {
    editor: __SSpecsEditorComponent;
    propObj: any;
    path: string[];
    valuePath: string[];
    settings: ISSpecsEditorWidgetSettings;
    status: ISSpeceEditorWidgetStatus;
    _values: any;
    _errors: string[];
    _warnings: string[];
    constructor(deps: ISSpecsEditorWidgetDeps, settings?: ISSpecsEditorWidgetSettings);
    get values(): any;
    resetValue(value: any): void;
    setValue(value: any, settings?: ISSpecsEditorWidgetSetValueSettings): void;
    _validate(values?: any): ISSpecsEditorWidgetValidateResult;
    renderLabel(settings?: ISSpecsEditorComponentRenderLabelSettings): any;
    validate(values: any): ISSpecsEditorWidgetValidateResult;
    hasValuesForMedia(media: string): boolean;
    isResponsive(): boolean;
    hasErrors(): boolean;
    get lastError(): string;
    hasWarnings(): boolean;
    get lastWarning(): string;
}
