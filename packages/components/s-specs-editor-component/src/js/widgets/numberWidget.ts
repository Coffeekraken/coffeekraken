import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';

import type { ISNumber } from '@specimen/types';

export default class SSpecsEditorComponentNumberWidget {
    _error;
    _warning;
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

    render({ propObj, values, path }) {
        if (!values) {
            values = <ISNumber>{
                value: propObj.default,
            };
        }

        return {
            error: this._error,
            warning: this._warning,
            html: html`
                <div class="${this._component.utils.cls('_number-widget')}">
                    <label
                        class="${this._component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        <input
                            @change=${(e) => {
                                let value = e.target.value;

                                // letters in value
                                if (Number.isNaN(parseFloat(value))) {
                                    e.target.value = 0;
                                    this._error = __i18n(
                                        `Passed value "%s" is not a valid number`,
                                        {
                                            id: 's-specs-editor.widget.number.invalid',
                                            tokens: {
                                                s: value,
                                            },
                                        },
                                    );
                                    return this._component.requestUpdate();
                                }

                                // letters in value
                                if (
                                    `${parseFloat(value)}`.length !==
                                    value.length
                                ) {
                                    value = parseFloat(value);
                                    e.target.value = value;
                                }

                                // min
                                if (
                                    propObj.min !== undefined &&
                                    value < propObj.min
                                ) {
                                    value = propObj.min;
                                    e.target.value = value;
                                    this._warning = __i18n(
                                        `The value must be greater or equal to %s`,
                                        {
                                            id: 's-specs-editor.widget.number.min',
                                            tokens: {
                                                s: propObj.min,
                                            },
                                        },
                                    );
                                    return this._component.requestUpdate();
                                }

                                // max
                                if (
                                    propObj.max !== undefined &&
                                    value > propObj.max
                                ) {
                                    value = propObj.max;
                                    e.target.value = value;
                                    this._warning = __i18n(
                                        'The value must be lower or equal to %s',
                                        {
                                            id: 's-specs-editor.widget.number.max',
                                            tokens: {
                                                s: propObj.max,
                                            },
                                        },
                                    );
                                    return this._component.requestUpdate();
                                }

                                this._error = null;
                                this._warning = null;

                                this._component.setValue(path, {
                                    value,
                                });
                                this._component.apply();
                            }}
                            type="number"
                            step="0.1"
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
            `,
        };
    }
}
