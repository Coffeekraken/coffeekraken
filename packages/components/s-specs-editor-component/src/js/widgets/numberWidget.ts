import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentNumberWidget extends __SSpecsEditorWidget {
    static isActive() {
        return true;
    }

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.value) {
            this.values.value = this.propObj.default;
        }
    }

    validate(newValues) {
        let value = newValues.value;

        // letters in value
        if (Number.isNaN(parseFloat(value))) {
            return {
                error: __i18n(`Passed value "%s" is not a valid number`, {
                    id: 's-specs-editor.widget.number.invalid',
                    tokens: {
                        s: value,
                    },
                }),
            };
        }

        // letters in value
        if (`${parseFloat(value)}`.length !== value.length) {
            value = parseFloat(value);
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
            <div class="${this.editor.utils.cls('_number-widget')}">
                <label
                    class="${this.editor.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <input
                        @change=${(e) => {
                            let value = e.target.value;
                            this.setValue(value);
                            this.editor.apply();
                        }}
                        type="number"
                        step="0.1"
                        min=${this.propObj.min}
                        max=${this.propObj.max}
                        name="${this.path.at(-1)}"
                        class="${this.editor.utils.cls('_input', 's-input')}"
                        placeholder="${this.propObj.placeholder}"
                        path="${this.path.join('.')}"
                        value="${this.values.value}"
                    />
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>
            </div>
        `;
    }
}
