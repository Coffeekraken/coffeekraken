"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_i18n_1 = require("@coffeekraken/s-i18n");
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
                    <div class="${component.utils.cls('_checkbox-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            ${component.renderLabel(propObj, path)}
                        </label>
                        ${propObj.options.map((option, i) => {
                    var _a;
                    return (0, lit_1.html) `
                                <label
                                    class="${component.utils.cls('_label', 's-label')}"
                                >
                                    <span class="_option">${option.name}</span>
                                    <input
                                        type="checkbox"
                                        @change=${(e) => {
                        if (e.target.checked) {
                            addValue(option);
                        }
                        else {
                            removeValue(option);
                        }
                        const itemsCount = Object.keys(values.value).length;
                        // min
                        if (propObj.min !== undefined &&
                            itemsCount < propObj.min) {
                            error = (0, s_i18n_1.__i18n)('You must select at least %s item(s)', {
                                id: 's-specs-editor.widget.checkbox.min',
                                tokens: {
                                    '%s': propObj.min,
                                },
                            });
                            return component.requestUpdate();
                        }
                        // max
                        if (propObj.max !== undefined &&
                            itemsCount > propObj.max) {
                            error = (0, s_i18n_1.__i18n)('You must select at most %s item(s)', {
                                id: 's-specs-editor.widget.checkbox.max',
                                tokens: {
                                    '%s': propObj.max,
                                },
                            });
                            return component.requestUpdate();
                        }
                        warning = null;
                        error = null;
                        component.setValue(path, values);
                        component.apply();
                    }}
                                        name="${path.at(-1)}"
                                        class="${component.utils.cls('_checkbox', 's-checkbox')}"
                                        ?checked=${getValueById(option.id)}
                                        id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                        .value=${option.value}
                                    />
                                </label>
                            `;
                })}
                    </div>
                `,
            };
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLGlEQUE4QztBQUk5QyxtQkFBeUIsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWU7b0JBQ2pCLEtBQUssRUFDRCxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUM5QyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUNuQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTzs0QkFDbEIsQ0FBQyxDQUFDLEVBQUU7NEJBQ0osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPO2lCQUM1QixDQUFDO2FBQ0w7WUFFRCxTQUFTLFlBQVksQ0FBQyxFQUFFO2dCQUNwQixLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDcEIsT0FBTyxRQUFRLENBQUM7cUJBQ25CO2lCQUNKO1lBQ0wsQ0FBQztZQUNELFNBQVMsUUFBUSxDQUFDLE1BQU07Z0JBQ3BCLDBCQUEwQjtnQkFDMUIsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUN6QixPQUFPO2lCQUNWO2dCQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFDRCxTQUFTLFdBQVcsQ0FBQyxNQUFNO2dCQUN2QixNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ1gsT0FBTztpQkFDVjtnQkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBRUQsT0FBTztnQkFDSCxLQUFLO2dCQUNMLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLElBQUEsVUFBSSxFQUFBO2tDQUNRLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDOztxQ0FFcEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OzhCQUVDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7MEJBRXhDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNqQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7b0JBQUMsT0FBQSxJQUFBLFVBQUksRUFBQTs7NkNBRUYsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUixTQUFTLENBQ1o7OzREQUV1QixNQUFNLENBQUMsSUFBSTs7O2tEQUdyQixDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNaLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2xCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDcEI7NkJBQU07NEJBQ0gsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUN2Qjt3QkFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUMxQixNQUFNLENBQUMsS0FBSyxDQUNmLENBQUMsTUFBTSxDQUFDO3dCQUVULE1BQU07d0JBQ04sSUFDSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVM7NEJBQ3pCLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUMxQjs0QkFDRSxLQUFLLEdBQUcsSUFBQSxlQUFNLEVBQ1YscUNBQXFDLEVBQ3JDO2dDQUNJLEVBQUUsRUFBRSxvQ0FBb0M7Z0NBQ3hDLE1BQU0sRUFBRTtvQ0FDSixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUc7aUNBQ3BCOzZCQUNKLENBQ0osQ0FBQzs0QkFDRixPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQzt5QkFDcEM7d0JBRUQsTUFBTTt3QkFDTixJQUNJLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUzs0QkFDekIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQzFCOzRCQUNFLEtBQUssR0FBRyxJQUFBLGVBQU0sRUFDVixvQ0FBb0MsRUFDcEM7Z0NBQ0ksRUFBRSxFQUFFLG9DQUFvQztnQ0FDeEMsTUFBTSxFQUFFO29DQUNKLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRztpQ0FDcEI7NkJBQ0osQ0FDSixDQUFDOzRCQUNGLE9BQU8sU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO3lCQUNwQzt3QkFFRCxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNmLEtBQUssR0FBRyxJQUFJLENBQUM7d0JBRWIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ2pDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDdEIsQ0FBQztnREFDTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lEQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixXQUFXLEVBQ1gsWUFBWSxDQUNmO21EQUNVLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOzhDQUM1QixNQUFBLE1BQU0sQ0FBQyxFQUFFLG1DQUFJLFVBQVUsQ0FBQyxFQUFFO2lEQUN2QixNQUFNLENBQUMsS0FBSzs7OzZCQUdoQyxDQUFBO2lCQUFBLENBQ0o7O2lCQUVSO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXRJRCw0QkFzSUMifQ==