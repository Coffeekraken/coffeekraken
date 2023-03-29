import { html } from 'lit';

import type { ISInteger } from '@specimen/types';

import { __i18n } from '@coffeekraken/s-i18n';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = <ISInteger>{
                    value: propObj.default,
                };
            }

            return {
                error,
                warning,
                html: html`
                    <div class="${component.utils.cls('_integer-widget')}">
                        <label
                            class="${component.utils.cls(
                                '_label',
                                's-label s-label--block',
                            )}"
                        >
                            <input
                                @change=${(e) => {
                                    let value = e.target.value;

                                    // letters in value
                                    if (Number.isNaN(parseInt(value))) {
                                        e.target.value = 0;
                                        error = __i18n(
                                            `Passed value "%s" is not a valid integer`,
                                            {
                                                id: 's-specs-editor.widget.integer.invalid',
                                                tokens: {
                                                    '%s': value,
                                                },
                                            },
                                        );
                                        return component.requestUpdate();
                                    }

                                    // letters in value
                                    if (
                                        `${parseInt(value)}`.length !==
                                        value.length
                                    ) {
                                        value = parseInt(value);
                                        e.target.value = value;
                                    }

                                    // min
                                    if (
                                        propObj.min !== undefined &&
                                        value < propObj.min
                                    ) {
                                        value = propObj.min;
                                        e.target.value = value;
                                        warning = __i18n(
                                            `The value must be greater or equal to %s`,
                                            {
                                                id: 's-specs-editor.widget.integer.min',
                                                tokens: {
                                                    '%s': propObj.min,
                                                },
                                            },
                                        );
                                        return component.requestUpdate();
                                    }

                                    // max
                                    if (
                                        propObj.max !== undefined &&
                                        value > propObj.max
                                    ) {
                                        value = propObj.max;
                                        e.target.value = value;
                                        warning = __i18n(
                                            `The value must be lower or equal to %s`,
                                            {
                                                id: 's-specs-editor.widget.integer.max',
                                                tokens: {
                                                    '%s': propObj.max,
                                                },
                                            },
                                        );
                                        return component.requestUpdate();
                                    }

                                    error = null;
                                    warning = null;

                                    component.setValue(path, {
                                        value,
                                    });
                                    component.apply();
                                }}
                                type="number"
                                step="1"
                                min=${propObj.min}
                                max=${propObj.max}
                                name="${path.at(-1)}"
                                class="${component.utils.cls(
                                    '_input',
                                    's-input',
                                )}"
                                placeholder="${propObj.placeholder}"
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
