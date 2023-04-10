import { __clone, __deepMerge, __get, __set } from '@coffeekraken/sugar/object';
import type { ISSpecsEditorComponentRenderLabelSettings } from './SSpecsEditorComponent';
import __SSpecsEditorComponent from './SSpecsEditorComponent';

import { html } from 'lit';

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
    status: ISSpeceEditorWidgetStatus = {
        pristine: true,
    };

    _values: any;
    _errors: string[] = [];
    _warnings: string[] = [];

    constructor(
        deps: ISSpecsEditorWidgetDeps,
        settings?: ISSpecsEditorWidgetSettings,
    ) {
        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = deps.path;
        this.valuePath = this.path.filter((l) => l !== 'props');
        this._values = deps.values;

        this.settings = {
            label: true,
            ...(deps.settings ?? {}),
        };

        // if (this._values === undefined) {
        //     if (this.propObj.type?.match(/\[\]$/)) {
        //         this._values = [];
        //     } else {
        //         this._values = {};
        //     }
        // }
    }

    get values(): any {
        if (this.isResponsive()) {
            if (!this._values.media) {
                this._values.media = {};
            }
            if (!this._values.media[this.editor.props.media]) {
                this._values.media[this.editor.props.media] = {};
            }
            return this._values.media[this.editor.props.media];
        }
        return this._values;
    }

    resetValue(value: any): void {
        this.setValue(value, {
            validate: false,
        });
    }

    setValue(value: any, settings?: ISSpecsEditorWidgetSetValueSettings): void {
        const finalSettings: ISSpecsEditorWidgetSetValueSettings = {
            media: null,
            path: '.',
            merge: true,
            validate: true,
            ...(settings ?? {}),
        };

        // not so much pristine...
        this.status.pristine = false;

        const sourceValues = finalSettings.noneResponsive
            ? this._values
            : this.values;

        // get the current values
        let newValues = __clone(sourceValues, {
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

        // validate
        let validateResult: ISSpecsEditorWidgetValidateResult = {};
        if (finalSettings.validate) {
            validateResult = this._validate(newValues);
        }

        // if no error, set the new value
        if (!validateResult.error) {
            let path = finalSettings.path;
            if (this.isResponsive()) {
                path =
                    `media.${this.editor.props.media}.${finalSettings.path}`.replace(
                        /\.{2}/gm,
                        '',
                    );
            }

            __set(this._values, path, newValues, {
                preferAssign: true,
            });

            // apply the changes in the editor
            this.editor.apply();
        } else {
            // update the UI to display errors
            this.editor.requestUpdate();
        }
    }

    _validate(values?) {
        if (!values) {
            values = __clone(this._values, {
                deep: true,
            });
        }

        // reset errors and warnings
        this._errors = [];
        this._warnings = [];

        // validate new values
        const validateResult = this.validate(values) ?? {};

        // error and warnings
        if (validateResult.error) {
            this._errors.push(validateResult.error);
        }
        if (validateResult.warning) {
            this._warnings.push(validateResult.warning);
        }

        return validateResult;
    }

    renderLabel(settings?: ISSpecsEditorComponentRenderLabelSettings): any {
        if (!this.settings.label) {
            return '';
        }
        return html` <label
            class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
            @click=${(e) => e.preventDefault()}
        >
            ${this.editor.renderLabel(this.propObj, this.path, settings)}
        </label>`;
    }

    validate(values: any): ISSpecsEditorWidgetValidateResult {
        return {};
    }

    hasValuesForMedia(media: string): boolean {
        return Object.keys(this._values?.media?.[media] ?? {}).length > 0;
    }

    isResponsive(): boolean {
        return this.propObj.responsive;
    }

    hasErrors(): boolean {
        if (this.status.pristine && this.editor.status.pristine) {
            return false;
        }
        if (this.status.pristine) {
            this._validate();
        }
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
