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
                    value: propObj.default,
                };
            }
            return {
                error,
                warning,
                html: (0, lit_1.html) `
                    <div class="${component.utils.cls('_integer-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            <input
                                @change=${(e) => {
                    let value = e.target.value;
                    // letters in value
                    if (Number.isNaN(parseInt(value))) {
                        e.target.value = 0;
                        error = (0, s_i18n_1.__i18n)(`Passed value "%s" is not a valid integer`, {
                            id: 's-specs-editor.widget.integer.invalid',
                            tokens: {
                                '%s': value,
                            },
                        });
                        return component.requestUpdate();
                    }
                    // letters in value
                    if (`${parseInt(value)}`.length !==
                        value.length) {
                        value = parseInt(value);
                        e.target.value = value;
                    }
                    // min
                    if (propObj.min !== undefined &&
                        value < propObj.min) {
                        value = propObj.min;
                        e.target.value = value;
                        warning = (0, s_i18n_1.__i18n)(`The value must be greater or equal to %s`, {
                            id: 's-specs-editor.widget.integer.min',
                            tokens: {
                                '%s': propObj.min,
                            },
                        });
                        return component.requestUpdate();
                    }
                    // max
                    if (propObj.max !== undefined &&
                        value > propObj.max) {
                        value = propObj.max;
                        e.target.value = value;
                        warning = (0, s_i18n_1.__i18n)(`The value must be lower or equal to %s`, {
                            id: 's-specs-editor.widget.integer.max',
                            tokens: {
                                '%s': propObj.max,
                            },
                        });
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
                                class="${component.utils.cls('_input', 's-input')}"
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLGlEQUE4QztBQUU5QyxtQkFBeUIsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWM7b0JBQ2hCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTztpQkFDekIsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxLQUFLO2dCQUNMLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLElBQUEsVUFBSSxFQUFBO2tDQUNRLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDOztxQ0FFbkMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OzswQ0FHYSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNaLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUUzQixtQkFBbUI7b0JBQ25CLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDL0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixLQUFLLEdBQUcsSUFBQSxlQUFNLEVBQ1YsMENBQTBDLEVBQzFDOzRCQUNJLEVBQUUsRUFBRSx1Q0FBdUM7NEJBQzNDLE1BQU0sRUFBRTtnQ0FDSixJQUFJLEVBQUUsS0FBSzs2QkFDZDt5QkFDSixDQUNKLENBQUM7d0JBQ0YsT0FBTyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQ3BDO29CQUVELG1CQUFtQjtvQkFDbkIsSUFDSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU07d0JBQzNCLEtBQUssQ0FBQyxNQUFNLEVBQ2Q7d0JBQ0UsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3FCQUMxQjtvQkFFRCxNQUFNO29CQUNOLElBQ0ksT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTO3dCQUN6QixLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFDckI7d0JBQ0UsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzt3QkFDdkIsT0FBTyxHQUFHLElBQUEsZUFBTSxFQUNaLDBDQUEwQyxFQUMxQzs0QkFDSSxFQUFFLEVBQUUsbUNBQW1DOzRCQUN2QyxNQUFNLEVBQUU7Z0NBQ0osSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHOzZCQUNwQjt5QkFDSixDQUNKLENBQUM7d0JBQ0YsT0FBTyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQ3BDO29CQUVELE1BQU07b0JBQ04sSUFDSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVM7d0JBQ3pCLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxFQUNyQjt3QkFDRSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixPQUFPLEdBQUcsSUFBQSxlQUFNLEVBQ1osd0NBQXdDLEVBQ3hDOzRCQUNJLEVBQUUsRUFBRSxtQ0FBbUM7NEJBQ3ZDLE1BQU0sRUFBRTtnQ0FDSixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUc7NkJBQ3BCO3lCQUNKLENBQ0osQ0FBQzt3QkFDRixPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDcEM7b0JBRUQsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDYixPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUVmLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUNyQixLQUFLO3FCQUNSLENBQUMsQ0FBQztvQkFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7OztzQ0FHSyxPQUFPLENBQUMsR0FBRztzQ0FDWCxPQUFPLENBQUMsR0FBRzt3Q0FDVCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lDQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1IsU0FBUyxDQUNaOytDQUNjLE9BQU8sQ0FBQyxXQUFXO3dDQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt5Q0FDYixNQUFNLENBQUMsS0FBSzs7OEJBRXZCLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2lCQUdqRDthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF2SEQsNEJBdUhDIn0=