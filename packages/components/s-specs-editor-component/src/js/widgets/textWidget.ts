import { html } from 'lit';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISString } from '@specimen/types';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = <ISString>{
                    value: propObj.default,
                };
            }

            return {
                error,
                warning,
                html: html`
                    <div class="${component.utils.cls('_text-widget')}">
                        <label
                            class="${component.utils.cls(
                                '_label',
                                's-label s-label--block',
                            )}"
                        >
                            <input
                                @change=${(e) => {
                                    if (propObj.required && !e.target.value) {
                                        error = __i18n(
                                            `This property is required`,
                                            {
                                                id: 's-specs-editor.widget.required',
                                            },
                                        );
                                        return component.requestUpdate();
                                    }

                                    error = null;
                                    warning = null;

                                    component.setValue(path, {
                                        value: e.target.value,
                                    });
                                    component.apply();
                                }}
                                type="text"
                                name="${path.at(-1)}"
                                class="${component.utils.cls(
                                    '_input',
                                    's-input',
                                )}"
                                placeholder="${propObj.pladeholder}"
                                path="${path.join('.')}"
                                value="${values.value}"
                            />
                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
