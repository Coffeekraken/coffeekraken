import { html } from 'lit';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISString } from '@specimen/types';

export default class SSpecsEditorComponentTextWidget {
    _error;
    _warning;
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
        return {
            error: this._error,
            warning: this._warning,
            html: html`
                <div class="${this._component.utils.cls('_text-widget')}">
                    <label
                        class="${this._component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        <input
                            @change=${(e) => {
                                if (propObj.required && !e.target.value) {
                                    this._error = __i18n(
                                        `This property is required`,
                                        {
                                            id: 's-specs-editor.widget.required',
                                        },
                                    );
                                    return this._component.requestUpdate();
                                }

                                this._error = null;
                                this._warning = null;

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
            `,
        };
    }
}
