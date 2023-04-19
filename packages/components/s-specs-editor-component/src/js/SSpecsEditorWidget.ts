import {
    __clone,
    __deepClean,
    __deepMerge,
    __get,
    __set,
} from '@coffeekraken/sugar/object';
import type { ISSpecsEditorComponentRenderLabelSettings } from './SSpecsEditorComponent';
import __SSpecsEditorComponent from './SSpecsEditorComponent';

import { __wait } from '@coffeekraken/sugar/datetime';

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
    _canBeOverride;

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
        this._values = deps.values;
        this._source = __deepClean(deps.source ?? {});

        // merge the values and the source together
        // Note that we do not clone the object to keep reference to the _values one
        __deepMerge(this._values, this._source, {
            clone: false,
        });
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

    get noneResponsiveValue(): any {
        return this._values ?? {};
    }

    resetValue(): void {
        for (let [key, value] of Object.entries(this._values)) {
            delete this._values[key];
        }
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
        if (!Object.keys(this._source).length) {
            return false;
        }

        if (this._canBeOverride === undefined) {
            const cleanedValues = __deepClean(
                __clone(this._values, {
                    deep: true,
                }),
            );
            this._canBeOverride =
                JSON.stringify(cleanedValues) === JSON.stringify(this._source);
        }

        return this._canBeOverride;
    }

    async setDefault(
        value: any,
        settings?: ISSpecsEditorWidgetSetValueSettings,
    ) {
        return this.setValue(value, {
            ...(settings ?? {}),
            validate: false,
            apply: false,
        });
    }

    async setValue(
        value: any,
        settings?: ISSpecsEditorWidgetSetValueSettings,
    ): Promise<void> {
        const finalSettings: ISSpecsEditorWidgetSetValueSettings = {
            media: null,
            path: '.',
            merge: false,
            validate: true,
            apply: true,
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

        _console.log('setted', value);
        _console.log('new', newValues);

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

            // reset the canBeOverride status
            this._canBeOverride = undefined;

            // ugly hack to avoid issue in repeatable display...
            await __wait();

            // apply the changes in the editor
            if (finalSettings.apply) {
                this.editor.apply();
            }
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
