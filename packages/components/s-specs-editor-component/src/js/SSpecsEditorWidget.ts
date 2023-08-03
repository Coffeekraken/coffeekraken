import {
    __clone,
    __deepClean,
    __deepMerge,
    __delete,
    __get,
    __set,
} from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';
import type { ISSpecsEditorComponentRenderLabelSettings } from './SSpecsEditorComponent.js';
import __SSpecsEditorComponent from './SSpecsEditorComponent.js';

import { __isPlainObject } from '@coffeekraken/sugar/is';

import __SSpecs from '@coffeekraken/s-specs';

import { __wait } from '@coffeekraken/sugar/datetime';

import { html } from 'lit';

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
    status: ISSpeceEditorWidgetStatus = {
        pristine: true,
        unsaved: false,
    };

    _overrided;
    _canBeOverride;

    _source: any;
    _values: any;
    _errors: string[] = [];
    _warnings: string[] = [];

    constructor(deps: ISSpecsEditorWidgetDeps) {
        this.settings = {
            label: true,
            ...(deps.settings ?? {}),
        };

        // set a uniqid for the widget
        this.id = __uniqid();

        // grab values from dependencies
        this.editor = deps.editor;
        this.propObj = deps.propObj;
        this.path = Array.isArray(deps.pathOrCallback)
            ? deps.pathOrCallback
            : ['value'];
        this.callback =
            typeof deps.pathOrCallback === 'function'
                ? deps.pathOrCallback
                : null;
        this.valuePath = this.path.filter((l) => l !== 'props');
        this._values = deps.values;
        this._source = __deepClean(deps.source ?? {});

        // merge the values and the source together
        // Note that we do not clone the object to keep reference to the _values one
        __deepMerge(this._values, this._source, {
            clone: false,
        });

        // handle default
        if (!Object.keys(this._values).length && this.propObj.default) {
            if (__isPlainObject(this.propObj.default)) {
                Object.assign(this._values, this.propObj.default);
            } else {
                Object.assign(this._values, {
                    value: this.propObj.default,
                });
            }
        }
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

    saved(): void {
        this.status.unsaved = false;
    }

    clearValue(path?: string[] | string): void {
        if (!path) {
            return this.resetValue();
        }

        // not so much pristine...
        this.status.pristine = false;
        this.status.unsaved = true;

        // delete actual value
        __delete(this._values, path);

        // call the passed callback if is one
        this.callback?.(this._values);

        // update UI
        this.editor.requestUpdate();
    }

    resetValue(): void {
        // delete all values
        for (let [key, value] of Object.entries(this._values)) {
            delete this._values[key];
        }

        // not so much pristine...
        this.status.pristine = false;
        this.status.unsaved = true;

        // call the passed callback if is one
        this.callback?.(this._values);

        // update UI
        this.editor.requestUpdate();
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
            responsive: true,
            ...(settings ?? {}),
        };

        // not so much pristine...
        this.status.pristine = false;
        this.status.unsaved = true;

        const sourceValues = !finalSettings.responsive
            ? __get(this._values, finalSettings.path) ?? {}
            : this.values;

        // get the current values
        let newValues = __clone(sourceValues, {
            deep: true,
        });

        // set or merge new value
        if (finalSettings.merge) {
            __deepMerge(newValues, value);
        } else {
            newValues = value;
        }

        // validate
        let validateResult: ISSpecsEditorWidgetValidateResult = {};
        if (finalSettings.validate) {
            validateResult = this._validate(newValues);
        }

        // if no error, set the new value
        if (!validateResult.error) {
            let path = finalSettings.path;
            if (this.isResponsive() && finalSettings.responsive) {
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

            // call the passed callback if is one
            this.callback?.(this._values);

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

        console.log('VB', values, this.propObj);

        let valueToValidate = values;
        if (
            Object.keys(valueToValidate).length === 1 &&
            valueToValidate.value !== undefined
        ) {
            valueToValidate = valueToValidate.value;
        }

        const path = this.path;
        const objToValidate = {
            [path.at(-1)]: valueToValidate,
        };
        const specObj = {
            props: {
                [path.at(1)]: this.propObj,
            },
        };

        console.log('Ob', objToValidate, specObj);

        const res = __SSpecs.validate(objToValidate, specObj);
        console.log('RESSS', res);

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

    _widgets: any = {};
    renderWidget(propObj: any, callback: Function): any {
        if (!propObj.id) {
            throw new Error(
                `<red>[SSpecsEditor]</red> To render a widget with a callback, you MUST specify an "id" inside the "propObj"...`,
            );
        }

        if (!this._widgets[propObj.id]) {
            this._widgets[propObj.id] = this.editor.renderWidget(
                {
                    ...propObj,
                    id: `${this.id}.${propObj.id}`,
                },
                callback,
            );
        }

        return html` <div
            class="s-specs-editor_prop s-specs-editor_prop-${propObj.type.toLowerCase()}"
        >
            ${this._widgets[propObj.id]}
        </div>`;
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

    hasUnsavedChanges(): boolean {
        return !this.status.pristine && this.status.unsaved;
    }

    hasValuesForMedia(media: string): boolean {
        return Object.keys(this._values?.media?.[media] ?? {}).length > 0;
    }

    isResponsive(): boolean {
        return this.propObj.responsive;
    }

    hasErrors(): boolean {
        if (this.status.pristine && this.editor.state.status.pristine) {
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
