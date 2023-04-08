import type { __ISDatetime } from '@coffeekraken/sugar';
import { html } from 'lit';

import { __SDatetime } from '@specimen/types/utils';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentDatetimePickerWidget extends __SSpecsEditorWidget {
    static isActive() {
        return true;
    }

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.value) {
            Object.assign(this.values, {
                value: this.propObj.default,
                format: this.propObj.format ?? 'YYYY-MM-DD',
            });
        }
    }

    render() {
        const datetime = new __SDatetime(this.propObj, this.values);

        return html`
            <div class="${this.editor.utils.cls('_datetime-picker-widget')}">
                <label
                    class="${this.editor.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <s-datetime-picker
                        value="${this.values.value}"
                        ?calendar=${this.propObj.calendar}
                        format="${this.values.format}"
                        @s-datetime-picker.change=${(e) => {
                            this.setValue(<__ISDatetime>e.detail);
                            this.editor.apply();
                        }}
                        @s-datetime-picker.reset=${(e) => {
                            this.setValue(<__ISDatetime>e.detail);
                            this.editor.apply();
                        }}
                    >
                        <input
                            type="text"
                            name="datetime"
                            class="s-input"
                            placeholder=${this.propObj.placeholder}
                        />
                    </s-datetime-picker>
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>
            </div>
        `;
    }
}
