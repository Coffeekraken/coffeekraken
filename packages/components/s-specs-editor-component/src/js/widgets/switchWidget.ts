import { html } from 'lit';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentSwitchWidget extends __SSpecsEditorWidget {
    static isActive() {
        return true;
    }

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        _console.log('S', this.values);

        if (!this.values.value) {
            this.values.value = this.propObj.default ?? false;
        }
    }

    render() {
        return html`
            <div class="${this.editor.utils.cls('_switch-widget')}">
                <label class="${this.editor.utils.cls('_label', 's-label')}">
                    <input
                        @change=${(e) => {
                            this.setValue({
                                value: e.target.checked,
                            });
                            this.editor.apply();
                        }}
                        type="checkbox"
                        name="${this.path.at(-1)}"
                        class="${this.editor.utils.cls('_switch', 's-switch')}"
                        path="${this.path.join('.')}"
                        ?checked=${this.values.value !== false &&
                        this.values.value !== null &&
                        this.values.value !== undefined}
                    />
                    ${this.editor.renderLabel(this.propObj, this.path, {
                        tooltip: 'right',
                    })}
                </label>
            </div>
        `;
    }
}
