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
                values = {};
            }
            return {
                error,
                warning,
                html: html `
                    <div
                        class="${component.utils.cls('_datetime-picker-widget')}"
                    >
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            <s-datetime-picker
                                value="${(_b = (_a = values.value) !== null && _a !== void 0 ? _a : propObj.default) !== null && _b !== void 0 ? _b : new Date().toISOString()}"
                                ?calendar=${propObj.calendar}
                                format="${(_d = (_c = values.format) !== null && _c !== void 0 ? _c : propObj.format) !== null && _d !== void 0 ? _d : 'YYYY-MM-DD'}"
                                @s-datetime-picker.change=${(e) => {
                    component.setValue(path, e.detail);
                    component.apply();
                }}
                                @s-datetime-picker.reset=${(e) => {
                    component.setValue(path, e.detail);
                    component.apply();
                }}
                            >
                                <input
                                    type="text"
                                    name="datetime"
                                    class="s-input"
                                    placeholder=${propObj.placeholder}
                                />
                            </s-datetime-picker>
                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7WUFDRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFBOztpQ0FFTyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIseUJBQXlCLENBQzVCOzs7cUNBR1ksU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7Ozt5Q0FHWSxNQUFBLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQ3JCLE9BQU8sQ0FBQyxPQUFPLG1DQUNmLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFOzRDQUNaLE9BQU8sQ0FBQyxRQUFROzBDQUNsQixNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQ3ZCLE9BQU8sQ0FBQyxNQUFNLG1DQUNkLFlBQVk7NERBQ2dCLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQzlCLFNBQVMsQ0FBQyxRQUFRLENBQ2QsSUFBSSxFQUNVLENBQUMsQ0FBQyxNQUFNLENBQ3pCLENBQUM7b0JBQ0YsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN0QixDQUFDOzJEQUMwQixDQUFDLENBQUMsRUFBRSxFQUFFO29CQUM3QixTQUFTLENBQUMsUUFBUSxDQUNkLElBQUksRUFDVSxDQUFDLENBQUMsTUFBTSxDQUN6QixDQUFDO29CQUNGLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQzs7Ozs7O2tEQU1pQixPQUFPLENBQUMsV0FBVzs7OzhCQUd2QyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OztpQkFHakQ7YUFDSixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=