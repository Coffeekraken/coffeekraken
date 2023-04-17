import { html } from 'lit';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

import { __i18n } from '@coffeekraken/s-i18n';

import { __SCheckbox } from '@specimen/types/utils';

export default class SSpecsEditorComponentCheckboxWidget extends __SSpecsEditorWidget {
    _checkbox: __SCheckbox;

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.value) {
            this.setDefault(
                this.propObj.default ?? {
                    value: [],
                },
                {
                    validate: false,
                },
            );
        }

        this._checkbox = new __SCheckbox(this.propObj, this.values);
    }

    validate(newValues) {
        const itemsCount = Object.keys(newValues.value).length;

        // required
        if (this.propObj.required && this._checkbox.isEmpty()) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }

        // min
        if (this.propObj.min !== undefined && itemsCount < this.propObj.min) {
            return {
                error: __i18n('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }

        // max
        if (this.propObj.max !== undefined && itemsCount > this.propObj.max) {
            return {
                error: __i18n('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.max',
                    tokens: {
                        '%s': this.propObj.max,
                    },
                }),
            };
        }
    }

    render() {
        return html`
            <div class="${this.editor.utils.cls('_checkbox-widget')}">
                ${this.renderLabel()}
                ${this.propObj.options.map(
                    (option, i) => html`
                        <label
                            class="${this.editor.utils.cls(
                                '_label',
                                's-label',
                            )}"
                        >
                            <span class="_option">${option.name}</span>
                            <input
                                type="checkbox"
                                @change=${(e) => {
                                    if (e.target.checked) {
                                        this._checkbox.check(option);
                                    } else {
                                        this._checkbox.uncheck(option);
                                    }
                                    this.setValue(this.values);
                                }}
                                name="${this.path.at(-1)}"
                                class="${this.editor.utils.cls(
                                    '_checkbox',
                                    's-checkbox',
                                )}"
                                ?checked=${this._checkbox.isChecked(option)}
                                id="${option.id ?? `option-${i}`}"
                                .value=${option.value}
                            />
                        </label>
                    `,
                )}
            </div>
        `;
    }
}
