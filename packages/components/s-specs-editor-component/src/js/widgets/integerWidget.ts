import { html } from 'lit';

import { __i18n } from '@coffeekraken/s-i18n';

import { __isValidNumber } from '@coffeekraken/sugar/is';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentIntegerWidget extends __SSpecsEditorWidget {
    // specify if the final value has to be just the "value" data
    // and not an object with the "value" property
    static unwrapValue = true;

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
    }

    validate(newValues) {
        let value = newValues.value;

        // letters in value
        if (this.propObj.required && !__isValidNumber(value)) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }

        // letters in value
        if (`${parseInt(value)}`.length !== value.length) {
            value = parseInt(value);
        }

        // min
        if (this.propObj.min !== undefined && value < this.propObj.min) {
            value = this.propObj.min;
            return {
                error: __i18n(`The value must be greater or equal to %s`, {
                    id: 's-specs-editor.widget.integer.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }

        // max
        if (this.propObj.max !== undefined && value > this.propObj.max) {
            value = this.propObj.max;
            return {
                error: __i18n(`The value must be lower or equal to %s`, {
                    id: 's-specs-editor.widget.integer.max',
                    tokens: {
                        s: this.propObj.max,
                    },
                }),
            };
        }
    }

    render() {
        return html`
            <div class="${this.editor.utils.cls('_integer-widget')}">
                ${this.renderLabel()}
                <input
                    @change=${(e) => {
                        let value = parseInt(e.target.value);
                        this.setValue({
                            value,
                        });
                    }}
                    type="number"
                    step="1"
                    min=${this.propObj.min}
                    max=${this.propObj.max}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${this.propObj.default ??
                    this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                    value="${this.values.value}"
                />
            </div>
        `;
    }
}
