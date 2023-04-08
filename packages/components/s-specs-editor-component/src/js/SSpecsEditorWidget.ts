import { __clone, __deepMerge, __get, __set } from '@coffeekraken/sugar/object';
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
    _errors: string[] = [];
    _warnings: string[] = [];

    constructor(deps: ISSpecsEditorWidgetDeps) {
        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = deps.path;
        this._values = deps.values;
    }

    get values(): any {
        if (this.propObj.responsive) {
            return this._values.media[this.editor.props.media] ?? {};
        }
        return this._values;
    }

    setValue(value: any, settings?: ISSpecsEditorWidgetSetValueSettings): void {
        const finalSettings: ISSpecsEditorWidgetSetValueSettings = {
            path: '.',
            merge: false,
            ...(settings ?? {}),
        };

        // get the current values
        let newValues = __clone(this.values, {
            deep: true,
        });

        // set or merge new value
        if (finalSettings.merge) {
            __set(
                newValues,
                finalSettings.path,
                __deepMerge(__get(newValues, finalSettings.path), value),
            );
        } else {
            __set(newValues, finalSettings.path, value);
        }

        // validate new values
        const validateResult = this.validate(newValues) ?? {};

        // error and warnings
        if (validateResult.error) {
            this._errors.push(validateResult.error);
        }
        if (validateResult.warning) {
            this._warnings.push(validateResult.warning);
        }

        // if no error, set the new value
        if (!validateResult.error) {
            this.editor.setValue(this.path, newValues);
        }
    }

    validate(values: any): ISSpecsEditorWidgetValidateResult {
        return {};
    }

    hasValuesForMedia(media: string): boolean {
        return Object.keys(this._values?.media?.[media] ?? {}).length > 0;
    }

    hasErrors(): boolean {
        return this._errors.length > 0;
    }

    get lastError(): string {
        return this._errors[0];
    }

    hasWarnings(): boolean {
        return this._warnings.length > 0;
    }

    get lastWarning(): string {
        return this._warnings[0];
    }
}
