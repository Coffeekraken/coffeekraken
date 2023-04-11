import { html } from 'lit';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentTextWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
        if (!this.values.value) {
            this.values.value = this.propObj.default;
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
                />
            </div>
        `;
    }
}
