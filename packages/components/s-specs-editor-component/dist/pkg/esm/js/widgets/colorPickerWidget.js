import __SColor from '@coffeekraken/s-color';
import { html } from 'lit';
export default function (component) {
    let error, warning;
    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            var _a, _b, _c, _d;
            if (!values) {
                const color = new __SColor((_a = propObj.default) !== null && _a !== void 0 ? _a : '#ff0000', {
                    defaultFormat: (_b = propObj.format) !== null && _b !== void 0 ? _b : 'hexa',
                });
                values = Object.assign(Object.assign({}, color.toObject()), { format: (_c = propObj.format) !== null && _c !== void 0 ? _c : 'hexa', value: (_d = propObj.default) !== null && _d !== void 0 ? _d : color.toString() });
            }
            return {
                error,
                warning,
                html: html `
                    <div class="${component.utils.cls('_color-picker-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            <s-color-picker
                                value="${values.value}"
                                format="${values.format}"
                                @s-color-picker.change=${(e) => {
                    component.setValue(path, e.detail);
                    component.apply();
                }}
                            >
                                <input
                                    type="text"
                                    name="color"
                                    class="s-input"
                                    placeholder=${propObj.placeholder}
                                />
                                <div class="_color-preview"></div>
                            </s-color-picker>
                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLFNBQVMsRUFBRTtvQkFDckQsYUFBYSxFQUFFLE1BQUEsT0FBTyxDQUFDLE1BQU0sbUNBQUksTUFBTTtpQkFDMUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sR0FBRyxnQ0FDRixLQUFLLENBQUMsUUFBUSxFQUFFLEtBQ25CLE1BQU0sRUFBRSxNQUFBLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLE1BQU0sRUFDaEMsS0FBSyxFQUFFLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUM3QyxDQUFDO2FBQ0w7WUFFRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFBO2tDQUNRLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDOztxQ0FFeEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7Ozt5Q0FHWSxNQUFNLENBQUMsS0FBSzswQ0FDWCxNQUFNLENBQUMsTUFBTTt5REFDRSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUMzQixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzVDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQzs7Ozs7O2tEQU1pQixPQUFPLENBQUMsV0FBVzs7Ozs4QkFJdkMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7aUJBR2pEO2FBQ0osQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9