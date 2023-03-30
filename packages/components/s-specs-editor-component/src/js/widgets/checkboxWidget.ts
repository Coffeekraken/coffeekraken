import { html } from 'lit';

import { __i18n } from '@coffeekraken/s-i18n';

import type { ISCheckbox } from '@specimen/types';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = <ISCheckbox>{
                    value:
                        propObj.default && !Array.isArray(propObj.default)
                            ? [propObj.default]
                            : !propObj.default
                            ? []
                            : propObj.default,
                };
            }

            function getValueById(id) {
                for (let [i, valueObj] of values.value.entries()) {
                    if (valueObj.id === id) {
                        return valueObj;
                    }
                }
            }
            function addValue(option) {
                // value already in values
                if (getValueById(option.id)) {
                    return;
                }
                values.value.push(option);
            }
            function removeValue(option) {
                const valueObj = getValueById(option.id);
                // value not in values
                if (!valueObj) {
                    return;
                }
                values.value.splice(values.value.indexOf(valueObj), 1);
            }

            return {
                error,
                warning,
                html: html`
                    <div class="${component.utils.cls('_checkbox-widget')}">
                        <label
                            class="${component.utils.cls(
                                '_label',
                                's-label s-label--block',
                            )}"
                        >
                            ${component.renderLabel(propObj, path)}
                        </label>
                        ${propObj.options.map(
                            (option, i) => html`
                                <label
                                    class="${component.utils.cls(
                                        '_label',
                                        's-label',
                                    )}"
                                >
                                    <span class="_option">${option.name}</span>
                                    <input
                                        type="checkbox"
                                        @change=${(e) => {
                                            if (e.target.checked) {
                                                addValue(option);
                                            } else {
                                                removeValue(option);
                                            }

                                            const itemsCount = Object.keys(
                                                values.value,
                                            ).length;

                                            // min
                                            if (
                                                propObj.min !== undefined &&
                                                itemsCount < propObj.min
                                            ) {
                                                error = __i18n(
                                                    'You must select at least %s item__(s)__',
                                                    {
                                                        id: 's-specs-editor.widget.checkbox.min',
                                                        tokens: {
                                                            s: propObj.min,
                                                        },
                                                    },
                                                );
                                                return component.requestUpdate();
                                            }

                                            // max
                                            if (
                                                propObj.max !== undefined &&
                                                itemsCount > propObj.max
                                            ) {
                                                error = __i18n(
                                                    'You must select at most %s item__(s)__',
                                                    {
                                                        id: 's-specs-editor.widget.checkbox.max',
                                                        tokens: {
                                                            '%s': propObj.max,
                                                        },
                                                    },
                                                );
                                                return component.requestUpdate();
                                            }

                                            warning = null;
                                            error = null;

                                            component.setValue(path, values);
                                            component.apply();
                                        }}
                                        name="${path.at(-1)}"
                                        class="${component.utils.cls(
                                            '_checkbox',
                                            's-checkbox',
                                        )}"
                                        ?checked=${getValueById(option.id)}
                                        id="${option.id ?? `option-${i}`}"
                                        .value=${option.value}
                                    />
                                </label>
                            `,
                        )}
                    </div>
                `,
            };
        },
    };
}
