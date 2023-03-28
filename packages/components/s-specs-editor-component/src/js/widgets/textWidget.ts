import { html } from 'lit';

import type { ISString } from '@specimen/types';

export default function (component) {
    return {
        keepOriginals: false,
        isActive() {
            return true;
        },
        html({ propObj, values, path }) {
            if (!values) {
                values = <ISString>{
                    value: propObj.default,
                };
            }

            return html`
                <div class="${component.utils.cls('_prop-text')}">
                    <label
                        class="${component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        <input
                            @change=${(e) => {
                                component.setValue(path, {
                                    value: e.target.value,
                                });
                                component.apply();
                            }}
                            type="text"
                            name="${path.at(-1)}"
                            class="${component.utils.cls('_input', 's-input')}"
                            placeholder="${propObj.default ??
                            propObj.title ??
                            propObj.id}"
                            path="${path.join('.')}"
                            value="${values.value}"
                        />
                        ${component.renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
