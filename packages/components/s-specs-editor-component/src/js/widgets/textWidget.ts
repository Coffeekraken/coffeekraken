import { html } from 'lit';

import type { ISString } from '@specimen/types';

import { __i18n } from '@coffeekraken/s-i18n';

export default class SSpecsEditorComponentTextWidget {
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

    validate({ propObj, values }) {
        if (propObj.required && !values?.value) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
    }

    render({ propObj, values, path }) {
        if (!values) {
            values = <ISString>{
                value: propObj.default,
            };
        }
        return html`
            <div class="${this._component.utils.cls('_text-widget')}">
                <label
                    class="${this._component.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <input
                        @change=${(e) => {
                            this._component.setValue(path, {
                                value: e.target.value,
                            });
                            this._component.apply();
                        }}
                        type="text"
                        name="${path.at(-1)}"
                        class="${this._component.utils.cls(
                            '_input',
                            's-input',
                        )}"
                        placeholder="${propObj.pladeholder}"
                        path="${path.join('.')}"
                        value="${values.value}"
                    />
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
