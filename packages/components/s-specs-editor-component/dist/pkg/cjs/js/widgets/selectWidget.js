"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const lit_1 = require("lit");
function default_1(component) {
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
                html: (0, lit_1.html) `
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
                        error = (0, s_i18n_1.__i18n)('You must select at least %s item(s)', {
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
                        error = (0, s_i18n_1.__i18n)('You must select at most %s item(s)', {
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
                    return (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUkzQixtQkFBeUIsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWE7b0JBQ2YsS0FBSyxFQUNELE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7d0JBQzlDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7d0JBQ25CLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPOzRCQUNsQixDQUFDLENBQUMsRUFBRTs0QkFDSixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU87aUJBQzVCLENBQUM7YUFDTDtZQUVELFNBQVMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3BCLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUM5QyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUNwQixPQUFPLFFBQVEsQ0FBQztxQkFDbkI7aUJBQ0o7WUFDTCxDQUFDO1lBQ0QsU0FBUyxRQUFRLENBQUMsTUFBTTtnQkFDcEIsMEJBQTBCO2dCQUMxQixJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3pCLE9BQU87aUJBQ1Y7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIs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