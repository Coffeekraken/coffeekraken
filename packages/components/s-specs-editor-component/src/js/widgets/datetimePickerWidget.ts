import type { __ISDatetime } from '@coffeekraken/sugar';
import { html } from 'lit';

import { __SDatetime } from '@specim3n/types/utils';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentDatetimePickerWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
    }

    render() {
        const datetime = new __SDatetime(this.propObj, this.values);

        return html`
            <div class="${this.editor.utils.cls('_datetime-picker-widget')}">
                ${this.renderLabel()}
                <s-datetime-picker
                    value="${this.values.value}"
                    ?calendar=${this.propObj.calendar}
                    format="${this.values.format}"
                    @s-datetime-picker.change=${(e) => {
                        this.setValue(<__ISDatetime>e.detail);
                    }}
                    @s-datetime-picker.reset=${(e) => {
                        this.setValue(<__ISDatetime>e.detail);
                    }}
                >
                    <input
                        type="text"
                        name="datetime"
                        class="s-input"
                        placeholder=${this.propObj.placeholder}
                    />
                </s-datetime-picker>
            </div>
        `;
    }
}
