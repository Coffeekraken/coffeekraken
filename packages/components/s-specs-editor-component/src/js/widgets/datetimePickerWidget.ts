import type { __ISDatetime } from '@coffeekraken/sugar';
import { html } from 'lit';

import { __SDatetime } from '@specimen/types/utils';

import type { ISDatetimeData } from '@specimen/types';

export default class SSpecsEditorComponentDatetimePickerWidget {
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
            values = <ISDatetimeData>{
                value: propObj.default,
                format: propObj.format ?? 'YYYY-MM-DD',
            };
        }

        const datetime = new __SDatetime(propObj, values);

        return html`
            <div
                class="${this._component.utils.cls('_datetime-picker-widget')}"
            >
                <label
                    class="${this._component.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <s-datetime-picker
                        value="${values.value}"
                        ?calendar=${propObj.calendar}
                        format="${values.format}"
                        @s-datetime-picker.change=${(e) => {
                            this._component.setValue(
                                path,
                                <__ISDatetime>e.detail,
                            );
                            this._component.apply();
                        }}
                        @s-datetime-picker.reset=${(e) => {
                            this._component.setValue(
                                path,
                                <__ISDatetime>e.detail,
                            );
                            this._component.apply();
                        }}
                    >
                        <input
                            type="text"
                            name="datetime"
                            class="s-input"
                            placeholder=${propObj.placeholder}
                        />
                    </s-datetime-picker>
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
