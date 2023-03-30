import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';

import { __SSelect } from '@specimen/types/utils';

import type { ISSelectData } from '@specimen/types';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values?.value) {
                values = <ISSelectData>{
                    value: [],
                };
            }

            const select = new __SSelect(propObj, values);

            _console.log('sel', select.getSelected());

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
                                                select.select(option.id);
                                            } else {
                                                select.unselect(option.id);
                                            }
                                        }
                                    }

                                    const itemsCount = values.value.length;

                                    // min
                                    if (
                                        propObj.multiple &&
                                        propObj.min !== undefined &&
                                        itemsCount < propObj.min
                                    ) {
                                        error = __i18n(
                                            'You must select at least %s item__(s)__',
                                            {
                                                id: 's-specs-editor.widget.select.min',
                                                tokens: {
                                                    s: propObj.min,
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
                                            'You must select at most %s item__(s)__',
                                            {
                                                id: 's-specs-editor.widget.select.max',
                                                tokens: {
                                                    s: propObj.max,
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
                                            ?selected=${select.isSelected(
                                                option.id,
                                            )}
                                            .selected=${select.isSelected(
                                                option.id,
                                            )}
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
