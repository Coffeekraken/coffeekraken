import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
export default function (component) {
    let error, warning;
    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = {
                    value: propObj.default && !Array.isArray(propObj.default)
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
                html: html `
                    <div class="${component.utils.cls('_select-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            <select
                                @change=${(e) => {
                    for (let [i, option,] of propObj.options.entries()) {
                        for (let [j, $option] of [
                            ...e.target.options,
                        ].entries()) {
                            if (option.id !== $option.id) {
                                continue;
                            }
                            if ($option.selected) {
                                addValue(option);
                            }
                            else {
                                removeValue(option);
                            }
                        }
                    }
                    const itemsCount = Object.keys(values.value).length;
                    // min
                    if (propObj.multiple &&
                        propObj.min !== undefined &&
                        itemsCount < propObj.min) {
                        error = __i18n('You must select at least %s item(s)', {
                            id: 's-specs-editor.widget.select.min',
                            tokens: {
                                '%s': propObj.min,
                            },
                        });
                        return component.requestUpdate();
                    }
                    // max
                    if (propObj.multiple &&
                        propObj.max !== undefined &&
                        itemsCount > propObj.max) {
                        error = __i18n('You must select at most %s item(s)', {
                            id: 's-specs-editor.widget.select.max',
                            tokens: {
                                '%s': propObj.max,
                            },
                        });
                        return component.requestUpdate();
                    }
                    warning = null;
                    error = null;
                    // apply changes
                    component.setValue(path, values);
                    component.apply();
                }}
                                name="${path.at(-1)}"
                                class="${component.utils.cls('_select', 's-select')}"
                                ?multiple=${propObj.multiple}
                                placeholder="${propObj.placeholder}"
                                path="${path.join('.')}"
                            >
                                ${propObj.options.map((option, i) => {
                    var _a;
                    return html `
                                        <option
                                            .value="${option.value}"
                                            value="${option.value}"
                                            id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                            ?selected=${getValueById(option.id)}
                                            .selected=${getValueById(option.id) !== undefined}
                                        >
                                            ${option.name}
                                        </option>
                                    `;
                })}
                            </select>

                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBSTNCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWE7b0JBQ2YsS0FBSyxFQUNELE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7d0JBQzlDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7d0JBQ25CLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPOzRCQUNsQixDQUFDLENBQUMsRUFBRTs0QkFDSixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU87aUJBQzVCLENBQUM7YUFDTDtZQUVELFNBQVMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3BCLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUM5QyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUNwQixPQUFPLFFBQVEsQ0FBQztxQkFDbkI7aUJBQ0o7WUFDTCxDQUFDO1lBQ0QsU0FBUyxRQUFRLENBQUMsTUFBTTtnQkFDcEIsMEJBQTBCO2dCQUMxQixJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3pC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