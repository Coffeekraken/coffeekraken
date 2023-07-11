import { html } from 'lit';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';

import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentHtmlWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.value) {
            this.values.value = '';
        }
    }

    render() {
        return html`
            <div class="${this.editor.utils.cls('_html-widget')}">
                ${this.renderLabel()}

                <textarea
                    rows="5"
                    @change=${(e) =>
                        this.editor._update(this.path, this.propObj, e)}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${this.propObj.default ??
                    this.propObj.title ??
                    this.propObj.id}"
                    path="${this.path.join('.')}"
                >
${this.values.value}</textarea
                >
            </div>
        `;
    }
}
