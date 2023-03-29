import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
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
                        error = __i18n(`Passed value "%s" is not a valid integer`, {
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
                        warning = __i18n(`The value must be greater or equal to %s`, {
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
                        warning = __i18n(`The value must be lower or equal to %s`, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWM7b0JBQ2hCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTztpQkFDekIsQ0FBQzthQUNMO1lBRUQsT0FBTztnQkFDSCxLQUFLO2dCQUNMLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQTtrQ0FDUSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzs7cUNBRW5DLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7MENBR2EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDWixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFFM0IsbUJBQW1CO29CQUNuQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQy9CLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDbkIsS0FBSyxHQUFHLE1BQU0sQ0FDViwwQ0FBMEMsRUFDMUM7NEJBQ0ksRUFBRSxFQUFFLHVDQUF1Qzs0QkFDM0MsTUFBTSxFQUFFO2dDQUNKLElBQUksRUFBRSxLQUFLOzZCQUNkO3lCQUNKLENBQ0osQ0FBQzt3QkFDRixPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDcEM7b0JBRUQsbUJBQW1CO29CQUNuQixJQUNJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTTt3QkFDM0IsS0FBSyxDQUFDLE1BQU0sRUFDZDt3QkFDRSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN4QixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQzFCO29CQUVELE1BQU07b0JBQ04sSUFDSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVM7d0JBQ3pCLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxFQUNyQjt3QkFDRSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixPQUFPLEdBQUcsTUFBTSxDQUNaLDBDQUEwQyxFQUMxQzs0QkFDSSxFQUFFLEVBQUUsbUNBQW1DOzRCQUN2QyxNQUFNLEVBQUU7Z0NBQ0osSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHOzZCQUNwQjt5QkFDSixDQUNKLENBQUM7d0JBQ0YsT0FBTyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQ3BDO29CQUVELE1BQU07b0JBQ04sSUFDSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVM7d0JBQ3pCLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxFQUNyQjt3QkFDRSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixPQUFPLEdBQUcsTUFBTSxDQUNaLHdDQUF3QyxFQUN4Qzs0QkFDSSxFQUFFLEVBQUUsbUNBQW1DOzRCQUN2QyxNQUFNLEVBQUU7Z0NBQ0osSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHOzZCQUNwQjt5QkFDSixDQUNKLENBQUM7d0JBQ0YsT0FBTyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQ3BDO29CQUVELEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFFZixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDckIsS0FBSztxQkFDUixDQUFDLENBQUM7b0JBQ0gsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN0QixDQUFDOzs7c0NBR0ssT0FBTyxDQUFDLEdBQUc7c0NBQ1gsT0FBTyxDQUFDLEdBQUc7d0NBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5Q0FDVixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsUUFBUSxFQUNSLFNBQVMsQ0FDWjsrQ0FDYyxPQUFPLENBQUMsV0FBVzt3Q0FDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7eUNBQ2IsTUFBTSxDQUFDLEtBQUs7OzhCQUV2QixTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OztpQkFHakQ7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=