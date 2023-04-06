import { html } from 'lit';

import type { ISColorData } from '@specimen/types';
import { __SColor } from '@specimen/types/utils';

export default class SSpecsEditorComponentColorPickerWidget {
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
            values = <ISColorData>{
                format: propObj.format ?? 'hexa',
                value: propObj.default ?? '#ff0000ff',
            };
        }

        const color = new __SColor(propObj, values);

        return html`
            <div class="${this._component.utils.cls('_color-picker-widget')}">
                <label
                    class="${this._component.utils.cls(
                        '_label',
                        's-label s-label--block',
                    )}"
                >
                    <s-color-picker
                        value="${color.toString()}"
                        format="${propObj.format}"
                        @s-color-picker.change=${(e) => {
                            this._component.setValue(
                                path,
                                <ISColorData>e.detail,
                            );
                            this._component.apply();
                        }}
                    >
                        <input
                            type="text"
                            name="color"
                            class="s-input"
                            placeholder=${propObj.placeholder}
                        />
                        <div class="_color-preview"></div>
                    </s-color-picker>
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
