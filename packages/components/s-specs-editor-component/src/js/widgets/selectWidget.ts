import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';

import type { ISSelect } from '@specimen/types';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = <ISSelect>{
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
                    <div class="${component.utils.cls('_select-widget')}">
                        <label
                            class="${component.utils.cls(
                                '_label',
                                's-label s-label--block',
                            )}"
                        >
                            <select
                                @change=${(e) => {
                                    for (let [
                                        i,
                                        option,
                                    ] of propObj.options.entries()) {
                                        for (let [j, $option] of [
                                            ...e.target.options,
                                        ].entries()) {
                                            if (option.id !== $option.id) {
                                                continue;
                                            }

                                            if ($option.selected) {
                                                addValue(option);
                                            } else {
                                                removeValue(option);
                                            }
                                        }
                                    }

                                    const itemsCount = Object.keys(
                                        values.value,
                                    ).length;

                                    // min
                                    if (
                                        propObj.multiple &&
                                        propObj.min !== undefined &&
                                        itemsCount < propObj.min
                                    ) {
                                        error = __i18n(
                                            'You must select at least %s item(s)',
                                            {
                                                id: 's-specs-editor.widget.select.min',
                                                tokens: {
                                                    '%s': propObj.min,
                                                },
                                            },
                                        );
                                        return component.requestUpdate();
                                    }

                                    // max
                                    if (
                                        propObj.multiple &&
                                        propObj.max !== undefined &&
                                        itemsCount > propObj.max
                                    ) {
                                        error = __i18n(
                                            'You must select at most %s item(s)',
                                            {
                                                id: 's-specs-editor.widget.select.max',
                                                tokens: {
                                                    '%s': propObj.max,
                                                },
                                            },
                                        );
                                        return component.requestUpdate();
                                    }

                                    warning = null;
                                    error = null;

                                    // apply changes
                                    component.setValue(path, values);
                                    component.apply();
                                }}
                                name="${path.at(-1)}"
                                class="${component.utils.cls(
                                    '_select',
                                    's-select',
                                )}"
                                ?multiple=${propObj.multiple}
                                placeholder="${propObj.placeholder}"
                                path="${path.join('.')}"
                            >
                                ${propObj.options.map(
                                    (option, i) => html`
                                        <option
                                            .value="${option.value}"
                                            value="${option.value}"
                                            id="${option.id ?? `option-${i}`}"
                                            ?selected=${getValueById(option.id)}
                                            .selected=${getValueById(
                                                option.id,
                                            ) !== undefined}
                                        >
                                            ${option.name}
                                        </option>
                                    `,
                                )}
                            </select>

                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
