import { html } from 'lit';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISCheckboxData } from '@specimen/types';
import { __SCheckbox } from '@specimen/types/utils';

export default class SSpecsEditorComponentCheckboxWidget {
    _component;
    _propObj;
    _path;

    static isActive() {
        return true;
    }

    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }

    validate({ values, propObj }) {
        if (!values) {
            return;
        }

        const itemsCount = Object.keys(values.value).length;

        // min
        if (propObj.min !== undefined && itemsCount < propObj.min) {
            return {
                error: __i18n('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.min',
                    tokens: {
                        s: propObj.min,
                    },
                }),
            };
        }

        // max
        if (propObj.max !== undefined && itemsCount > propObj.max) {
            return {
                error: __i18n('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.max',
                    tokens: {
                        '%s': propObj.max,
                    },
                }),
            };
        }
    }

    render({ propObj, values, path }) {
        if (!values) {
            values = <ISCheckboxData>{
                value: [],
            };
        }

        const checkbox = new __SCheckbox(propObj, values);

        return html`
            <div class="${this._component.utils.cls('_checkbox-widget')}">
                <label
                    class="${this._component.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    ${this._component.renderLabel(propObj, path)}
                </label>
                ${propObj.options.map(
                    (option, i) => html`
                        <label
                            class="${this._component.utils.cls(
                                '_label',
                                's-label',
                            )}"
                        >
                            <span class="_option">${option.name}</span>
                            <input
                                type="checkbox"
                                @change=${(e) => {
                                    if (e.target.checked) {
                                        checkbox.check(option);
                                    } else {
                                        checkbox.uncheck(option);
                                    }

                                    this._component.setValue(path, values);
                                    this._component.apply();
                                }}
                                name="${path.at(-1)}"
                                class="${this._component.utils.cls(
                                    '_checkbox',
                                    's-checkbox',
                                )}"
                                ?checked=${checkbox.isChecked(option)}
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
