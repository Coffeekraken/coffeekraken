import {
    __clone,
    __deepClean,
    __deepMerge,
    __get,
    __set,
} from '@coffeekraken/sugar/object';
import type { ISSpecsEditorComponentRenderLabelSettings } from './SSpecsEditorComponent';
import __SSpecsEditorComponent from './SSpecsEditorComponent';

import { html } from 'lit';

export interface ISSpeceEditorWidgetStatus {
    pristine: boolean;
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
    source: any;
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

    _overrided;

    _source: any;
    _values: any;
    _errors: string[] = [];
    _warnings: string[] = [];

    constructor(
        deps: ISSpecsEditorWidgetDeps,
        settings?: ISSpecsEditorWidgetSettings,
    ) {
        this.settings = {
            label: true,
            ...(deps.settings ?? {}),
        };

        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = deps.path;
        this.valuePath = this.path.filter((l) => l !== 'props');
        this._source = __deepClean(deps.source ?? {});
        this._values = __deepClean(deps.values ?? {});

        // merge the values and the source together
        this._values = __deepMerge(this._source, this._values);
    }

    get values(): any {
        if (this.isResponsive()) {
            return this._values.media?.[this.editor.props.media] ?? {};
        }
        return this._values ?? {};
    }

    get noneResponsiveValue(): any {
        return this._values ?? {};
    }

    resetValue(value: any): void {
        this.setValue(value, {
            validate: false,
        });
    }

    mergeValue(
        value: any,
        settings?: ISSpecsEditorWidgetSetValueSettings,
    ): void {
        this.setValue(value, {
            ...(settings ?? {}),
            merge: true,
        });
    }

    override(): void {
        this._overrided = true;
    }

    canBeOverride(): boolean {
        if (this._overrided) {
            return false;
        }
        if (!this._source) {
            return false;
        }
        return JSON.stringify(this._values) === JSON.stringify(this._source);
    }

    setValue(value: any, settings?: ISSpecsEditorWidgetSetValueSettings): void {
        const finalSettings: ISSpecsEditorWidgetSetValueSettings = {
            media: null,
            path: '.',
            merge: false,
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
            if (this.isResponsive() && !finalSettings.noneResponsive) {
                path =
                    `media.${this.editor.props.media}.${finalSettings.path}`.replace(
                        /\.{2}/gm,
                        '',
                    );
            }

            // set the new value(s)
            __set(this._values, path, newValues, {
                preferAssign: true,
            });

            // clean the values
            __deepClean(this._values);

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

    renderInlineInput(settings: ISSpecsEditorWidgetInlineLabel): any {
        return html`
            <label class="_alt inline-input">
                <div class="_label">${settings.label}</div>
                <input
                    class="_input"
                    type="text"
                    name="alt"
                    placeholder="${settings.placeholder}"
                    value="${settings.value}"
                    @change=${settings.onChange ?? function () {}}
                />
            </label>
        `;
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
