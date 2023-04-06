import { html } from 'lit';

import type { ISInteger } from '@specimen/types';

import { __i18n } from '@coffeekraken/s-i18n';

export default class SSpecsEditorComponentIntegerWidget {
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

        let value = values.value;

        // letters in value
        if (Number.isNaN(parseInt(value))) {
            return {
                error: __i18n(`Passed value "%s" is not a valid integer`, {
                    id: 's-specs-editor.widget.integer.invalid',
                    tokens: {
                        s: value,
                    },
                }),
            };
        }

        // letters in value
        if (`${parseInt(value)}`.length !== value.length) {
            value = parseInt(value);
        }

        // min
        if (propObj.min !== undefined && value < propObj.min) {
            value = propObj.min;
            return {
                error: __i18n(`The value must be greater or equal to %s`, {
                    id: 's-specs-editor.widget.integer.min',
                    tokens: {
                        s: propObj.min,
                    },
                }),
            };
        }

        // max
        if (propObj.max !== undefined && value > propObj.max) {
            value = propObj.max;
            return {
                error: __i18n(`The value must be lower or equal to %s`, {
                    id: 's-specs-editor.widget.integer.max',
                    tokens: {
                        s: propObj.max,
                    },
                }),
            };
        }
    }

    render({ propObj, values, path }) {
        if (!values) {
            values = <ISInteger>{
                value: propObj.default,
            };
        }

        return html`
            <div class="${this._component.utils.cls('_integer-widget')}">
                <label
                    class="${this._component.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <input
                        @change=${(e) => {
                            let value = e.target.value;
                            this._component.setValue(path, {
                                value,
                            });
                            this._component.apply();
                        }}
                        type="number"
                        step="1"
                        min=${propObj.min}
                        max=${propObj.max}
                        name="${path.at(-1)}"
                        class="${this._component.utils.cls(
                            '_input',
                            's-input',
                        )}"
                        placeholder="${propObj.placeholder}"
                        path="${path.join('.')}"
                        value="${values.value}"
                    />
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
