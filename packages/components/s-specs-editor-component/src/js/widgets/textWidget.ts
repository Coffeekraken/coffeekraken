import { html } from 'lit';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentTextWidget extends __SSpecsEditorWidget {
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
            <div class="${this.editor.utils.cls('_text-widget')}">
                ${this.renderLabel()}
                <textarea
                    @change=${(e) => {
                        this.setValue({
                            value: e.target.value,
                        });
                    }}
                    rows="3"
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${this.propObj.pladeholder}"
                    path="${this.path.join('.')}"
                >
${this.values.value}</textarea
                >
            </div>
        `;
    }
}
