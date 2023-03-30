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
                    value: propObj.default,
                };
            }
            return {
                error,
                warning,
                html: (0, lit_1.html) `
                    <div class="${component.utils.cls('_number-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            <input
                                @change=${(e) => {
                    let value = e.target.value;
                    // letters in value
                    if (Number.isNaN(parseFloat(value))) {
                        e.target.value = 0;
                        error = (0, s_i18n_1.__i18n)(`Passed value "%s" is not a valid number`, {
                            id: 's-specs-editor.widget.number.invalid',
                            tokens: {
                                s: value,
                            },
                        });
                        return component.requestUpdate();
                    }
                    // letters in value
                    if (`${parseFloat(value)}`.length !==
                        value.length) {
                        value = parseFloat(value);
                        e.target.value = value;
                    }
                    // min
                    if (propObj.min !== undefined &&
                        value < propObj.min) {
                        value = propObj.min;
                        e.target.value = value;
                        warning = (0, s_i18n_1.__i18n)(`The value must be greater or equal to %s`, {
                            id: 's-specs-editor.widget.number.min',
                            tokens: {
                                s: propObj.min,
                            },
                        });
                        return component.requestUpdate();
                    }
                    // max
                    if (propObj.max !== undefined &&
                        value > propObj.max) {
                        value = propObj.max;
                        e.target.value = value;
                        warning = (0, s_i18n_1.__i18n)('The value must be lower or equal to %s', {
                            id: 's-specs-editor.widget.number.max',
                            tokens: {
                                s: propObj.max,
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
                                step="0.1"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUkzQixtQkFBeUIsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWE7b0JBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2lCQUN6QixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7a0NBQ1EsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7O3FDQUVsQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7OzBDQUdhLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1osSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBRTNCLG1CQUFtQjtvQkFDbkIsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ25CLEtBQUssR0FBRyxJQUFBLGVBQU0sRUFDVix5Q0FBeUMsRUFDekM7NEJBQ0ksRUFBRSxFQUFFLHNDQUFzQzs0QkFDMUMsTUFBTSxFQUFFO2dDQUNKLENBQUMsRUFBRSxLQUFLOzZCQUNYO3lCQUNKLENBQ0osQ0FBQzt3QkFDRixPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDcEM7b0JBRUQsbUJBQW1CO29CQUNuQixJQUNJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTTt3QkFDN0IsS0FBSyxDQUFDLE1BQU0sRUFDZDt3QkFDRSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMxQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQzFCO29CQUVELE1BQU07b0JBQ04sSUFDSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVM7d0JBQ3pCLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxFQUNyQjt3QkFDRSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixPQUFPLEdBQUcsSUFBQSxlQUFNLEVBQ1osMENBQTBDLEVBQzFDOzRCQUNJLEVBQUUsRUFBRSxrQ0FBa0M7NEJBQ3RDLE1BQU0sRUFBRTtnQ0FDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7NkJBQ2pCO3lCQUNKLENBQ0osQ0FBQzt3QkFDRixPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDcEM7b0JBRUQsTUFBTTtvQkFDTixJQUNJLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUzt3QkFDekIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQ3JCO3dCQUNFLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLE9BQU8sR0FBRyxJQUFBLGVBQU0sRUFDWix3Q0FBd0MsRUFDeEM7NEJBQ0ksRUFBRSxFQUFFLGtDQUFrQzs0QkFDdEMsTUFBTSxFQUFFO2dDQUNKLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRzs2QkFDakI7eUJBQ0osQ0FDSixDQUFDO3dCQUNGLE9BQU8sU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUNwQztvQkFFRCxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNiLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRWYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0JBQ3JCLEtBQUs7cUJBQ1IsQ0FBQyxDQUFDO29CQUNILFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQzs7O3NDQUdLLE9BQU8sQ0FBQyxHQUFHO3NDQUNYLE9BQU8sQ0FBQyxHQUFHO3dDQUNULElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7eUNBQ1YsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUixTQUFTLENBQ1o7K0NBQ2MsT0FBTyxDQUFDLFdBQVc7d0NBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3lDQUNiLE1BQU0sQ0FBQyxLQUFLOzs4QkFFdkIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7aUJBR2pEO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXZIRCw0QkF1SEMifQ==