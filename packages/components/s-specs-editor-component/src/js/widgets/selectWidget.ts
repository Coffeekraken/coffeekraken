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
                <div class="${component.utils.cls('_select-widget')}">
                    <label
                        class="${component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        <select
                            @change=${(e) => {
                                component.apply(path, {
                                    value: e.target.value,
                                });
                                component.apply();
                            }}
                            name="${path.at(-1)}"
                            class="${component.utils.cls(
                                '_select',
                                's-select',
                            )}"
                            placeholder="${propObj.default ??
                            propObj.title ??
                            propObj.id}"
                            path="${path.join('.')}"
                            .value="${values.value}"
                            value="${values.value}"
                        >
                            ${propObj.options.map(
                                (option) => html`
                                    <option
                                        .value="${option.value}"
                                        value="${option.value}"
                                        ?selected=${(!values.value &&
                                            option.value === null) ||
                                        option.value === String(values.value)}
                                    >
                                        ${option.name}
                                    </option>
                                `,
                            )}
                        </select>

                        ${component.renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
