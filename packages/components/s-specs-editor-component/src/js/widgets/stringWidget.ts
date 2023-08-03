import { html } from 'lit';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentStringWidget extends __SSpecsEditorWidget {
    // specify if the final value has to be just the "value" data
    // and not an object with the "value" property
    static unwrapValue = true;

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
        if (!this.values.value) {
            this.values.value = '';
        }
    }

    validate(newValues) {
        if (this.propObj.required && !newValues?.value) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
    }

    render() {
        return html`
            <div class="${this.editor.utils.cls('_string-widget')}">
                ${this.renderLabel()}
                <input
                    @change=${(e) => {
                        this.setValue({
                            value: e.target.value,
                        });
                    }}
                    type="text"
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${this.propObj.pladeholder}"
                    path="${this.path.join('.')}"
                    value="${this.values.value}"
                    .value=${this.values.value}
                />
            </div>
        `;
    }
}
