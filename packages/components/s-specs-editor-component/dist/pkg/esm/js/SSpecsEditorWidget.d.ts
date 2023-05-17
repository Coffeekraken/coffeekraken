import type { ISSpecsEditorComponentRenderLabelSettings } from './SSpecsEditorComponent';
import __SSpecsEditorComponent from './SSpecsEditorComponent';
export interface ISSpeceEditorWidgetStatus {
    pristine: boolean;
    unsaved: boolean;
}
export interface ISSpecsEditorWidgetInlineLabel {
    label: string;
    description?: string;
    value?: string;
    placeholder?: string;
    onChange?: Function;
}
export interface ISSpecsEditorWidgetSetValueSettings {
    media?: string;
    path?: string;
    merge?: boolean;
    responsive?: boolean;
    validate?: boolean;
    apply?: boolean;
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
    pathOrCallback: string[] | Function;
    values: any;
    source: any;
    propObj: any;
    settings: ISSpecsEditorWidgetSettings;
}
export default class SSpecsEditorWidget {
    id: string;
    editor: __SSpecsEditorComponent;
    propObj: any;
    path: string[];
    callback: Function;
    valuePath: string[];
    settings: ISSpecsEditorWidgetSettings;
    status: ISSpeceEditorWidgetStatus;
    _overrided: any;
    _canBeOverride: any;
    _source: any;
    _values: any;
    _errors: string[];
    _warnings: string[];
    constructor(deps: ISSpecsEditorWidgetDeps, settings?: ISSpecsEditorWidgetSettings);
    get values(): any;
    get noneResponsiveValue(): any;
    saved(): void;
    clearValue(path?: string[] | string): void;
    resetValue(): void;
    mergeValue(value: any, settings?: ISSpecsEditorWidgetSetValueSettings): void;
    override(): void;
    canBeOverride(): boolean;
    setDefault(value: any, settings?: ISSpecsEditorWidgetSetValueSettings): Promise<void>;
    setValue(value: any, settings?: ISSpecsEditorWidgetSetValueSettings): Promise<void>;
    _validate(values?: any): ISSpecsEditorWidgetValidateResult;
    renderLabel(settings?: ISSpecsEditorComponentRenderLabelSettings): any;
    _widgets: any;
    renderWidget(propObj: any, callback: Function): any;
    renderInlineInput(settings: ISSpecsEditorWidgetInlineLabel): any;
    validate(values: any): ISSpecsEditorWidgetValidateResult;
    hasUnsavedChanges(): boolean;
    hasValuesForMedia(media: string): boolean;
    isResponsive(): boolean;
    hasErrors(): boolean;
    get lastError(): string;
    hasWarnings(): boolean;
    get lastWarning(): string;
}
