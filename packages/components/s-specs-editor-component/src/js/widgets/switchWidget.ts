import { html } from 'lit';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentSwitchWidget extends __SSpecsEditorWidget {
    // specify if the final value has to be just the "value" data
    // and not an object with the "value" property
    static unwrapValue = true;

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (this.values.value === undefined) {
            this.propObj.value = false;
        }
    }

    render() {
        return html`
            <div class="${this.editor.utils.cls('_switch-widget')}">
                ${this.renderLabel({})}
                <input
                    @change=${(e) => {
                        this.setValue({
                            value: e.target.checked,
                        });
                    }}
                    type="checkbox"
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_switch', 's-switch')}"
                    path="${this.path.join('.')}"
                    ?checked=${this.values.value !== false &&
                    this.values.value !== null &&
                    this.values.value !== undefined}
                />
            </div>
        `;
    }
}
