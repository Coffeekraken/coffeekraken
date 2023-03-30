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
                    value: propObj.default,
                };
            }
            return {
                error,
                warning,
                html: html `
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
                        error = __i18n(`Passed value "%s" is not a valid number`, {
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
                        warning = __i18n(`The value must be greater or equal to %s`, {
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
                        warning = __i18n('The value must be lower or equal to %s', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBSTNCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWE7b0JBQ2YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2lCQUN6QixDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFBO2tDQUNRLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOztxQ0FFbEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OzswQ0FHYSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNaLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUUzQixtQkFBbUI7b0JBQ25CLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDakMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixLQUFLLEdBQUcsTUFBTSxDQUNWLHlDQUF5QyxFQUN6Qzs0QkFDSSxFQUFFLEVBQUUsc0NBQXNDOzRCQUMxQyxNQUFNLEVBQUU7Z0NBQ0osQ0FBQyxFQUFFLEtBQUs7NkJBQ1g7eUJBQ0osQ0FDSixDQUFDO3dCQUNGLE9BQU8sU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUNwQztvQkFFRCxtQkFBbUI7b0JBQ25CLElBQ0ksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNO3dCQUM3QixLQUFLLENBQUMsTUFBTSxFQUNkO3dCQUNFLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzFCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztxQkFDMUI7b0JBRUQsTUFBTTtvQkFDTixJQUNJLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUzt3QkFDekIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQ3JCO3dCQUNFLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLE9BQU8sR0FBRyxNQUFNLENBQ1osMENBQTBDLEVBQzFDOzRCQUNJLEVBQUUsRUFBRSxrQ0FBa0M7NEJBQ3RDLE1BQU0sRUFBRTtnQ0FDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7NkJBQ2pCO3lCQUNKLENBQ0osQ0FBQzt3QkFDRixPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDcEM7b0JBRUQsTUFBTTtvQkFDTixJQUNJLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUzt3QkFDekIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQ3JCO3dCQUNFLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLE9BQU8sR0FBRyxNQUFNLENBQ1osd0NBQXdDLEVBQ3hDOzRCQUNJLEVBQUUsRUFBRSxrQ0FBa0M7NEJBQ3RDLE1BQU0sRUFBRTtnQ0FDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7NkJBQ2pCO3lCQUNKLENBQ0osQ0FBQzt3QkFDRixPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDcEM7b0JBRUQsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDYixPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUVmLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUNyQixLQUFLO3FCQUNSLENBQUMsQ0FBQztvQkFDSCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7OztzQ0FHSyxPQUFPLENBQUMsR0FBRztzQ0FDWCxPQUFPLENBQUMsR0FBRzt3Q0FDVCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lDQUNWLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1IsU0FBUyxDQUNaOytDQUNjLE9BQU8sQ0FBQyxXQUFXO3dDQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt5Q0FDYixNQUFNLENBQUMsS0FBSzs7OEJBRXZCLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2lCQUdqRDthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==