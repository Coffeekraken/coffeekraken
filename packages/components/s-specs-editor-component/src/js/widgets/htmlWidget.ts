import { html } from 'lit';

import type { ISString } from '@specimen/types';

export default class SSpecsEditorComponentHtmlWidget {
    _component;
    _propObj;
    _path;

    static isActive() {
        return true;
    }

    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }

    render({ propObj, values, path }) {
        if (!values) {
            values = <ISString>{
                value: propObj.default,
            };
        }

        return html`
            <div class="${this._component.utils.cls('_html-widget')}">
                <label
                    class="${this._component.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <textarea
                        rows="5"
                        @change=${(e) =>
                            this._component._update(path, propObj, e)}
                        name="${path.at(-1)}"
                        class="${this._component.utils.cls(
                            '_input',
                            's-input',
                        )}"
                        placeholder="${propObj.default ??
                        propObj.title ??
                        propObj.id}"
                        path="${path.join('.')}"
                    >
${values.value}</textarea
                    >
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
