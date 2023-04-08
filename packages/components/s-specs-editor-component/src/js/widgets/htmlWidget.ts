import { html } from 'lit';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';

import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentHtmlWidget extends __SSpecsEditorWidget {
    static isActive() {
        return true;
    }

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.value) {
            this.values.value = this.propObj.default;
        }
    }

    render() {
        return html`
            <div class="${this.editor.utils.cls('_html-widget')}">
                <label
                    class="${this.editor.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <textarea
                        rows="5"
                        @change=${(e) =>
                            this.editor._update(this.path, this.propObj, e)}
                        name="${this.path.at(-1)}"
                        class="${this.editor.utils.cls('_input', 's-input')}"
                        placeholder="${this.propObj.default ??
                        this.propObj.title ??
                        this.propObj.id}"
                        path="${(this, path.join('.'))}"
                    >
${this.values.value}</textarea
                    >
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>
            </div>
        `;
    }
}
