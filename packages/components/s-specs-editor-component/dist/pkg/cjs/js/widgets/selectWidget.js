"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
function default_1(component) {
    let error, warning;
    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!(values === null || values === void 0 ? void 0 : values.value)) {
                values = {
                    value: [],
                };
            }
            const select = new utils_1.__SSelect(propObj, values);
            _console.log('sel', select.getSelected());
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
                                select.select(option.id);
                            }
                            else {
                                select.unselect(option.id);
                            }
                        }
                    }
                    const itemsCount = values.value.length;
                    // min
                    if (propObj.multiple &&
                        propObj.min !== undefined &&
                        itemsCount < propObj.min) {
                        error = (0, s_i18n_1.__i18n)('You must select at least %s item__(s)__', {
                            id: 's-specs-editor.widget.select.min',
                            tokens: {
                                s: propObj.min,
                            },
                        });
                        return component.requestUpdate();
                    }
                    // max
                    if (propObj.multiple &&
                        propObj.max !== undefined &&
                        itemsCount > propObj.max) {
                        error = (0, s_i18n_1.__i18n)('You must select at most %s item__(s)__', {
                            id: 's-specs-editor.widget.select.max',
                            tokens: {
                                s: propObj.max,
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
                                            id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                            ?selected=${select.isSelected(option.id)}
                                            .selected=${select.isSelected(option.id)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUUzQixpREFBa0Q7QUFJbEQsbUJBQXlCLFNBQVM7SUFDOUIsSUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDO0lBRW5CLE9BQU87UUFDSCxRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUEsRUFBRTtnQkFDaEIsTUFBTSxHQUFpQjtvQkFDbkIsS0FBSyxFQUFFLEVBQUU7aUJBQ1osQ0FBQzthQUNMO1lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU5QyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUUxQyxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7a0NBQ1EsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7O3FDQUVsQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7OzBDQUdhLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1osS0FBSyxJQUFJLENBQ0wsQ0FBQyxFQUNELE1BQU0sRUFDVCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQzVCLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSTs0QkFDckIsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9B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