import __SColor from '@coffeekraken/s-color';
import type { ISColor } from '@specimen/types';
import { html } from 'lit';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                const color = new __SColor(propObj.default ?? '#ff0000', {
                    defaultFormat: propObj.format ?? 'hexa',
                });
                values = <ISColor>{
                    ...color.toObject(),
                    format: propObj.format ?? 'hexa',
                    value: propObj.default ?? color.toString(),
                };
            }

            return {
                error,
                warning,
                html: html`
                    <div class="${component.utils.cls('_color-picker-widget')}">
                        <label
                            class="${component.utils.cls(
                                '_label',
                                's-label s-label--block',
                            )}"
                        >
                            <s-color-picker
                                value="${values.value}"
                                format="${values.format}"
                                @s-color-picker.change=${(e) => {
                                    component.setValue(path, <ISColor>e.detail);
                                    component.apply();
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
                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
