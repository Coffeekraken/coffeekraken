import { html } from 'lit';
export default function (component) {
    return {
        keepOriginals: false,
        isActive() {
            return true;
        },
        html({ propObj, values, path }) {
            var _a, _b, _c, _d;
            if (!values) {
                values = {};
            }
            return html `
                <div class="${component.utils.cls('_datetime-picker-widget')}">
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
                                placeholder="Choose a datetime"
                            />
                        </s-datetime-picker>
                        ${component.renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsTUFBTSxDQUFDLE9BQU8sV0FBVyxTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtZQUNELE9BQU8sSUFBSSxDQUFBOzhCQUNPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDOztpQ0FFM0MsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztxQ0FHWSxNQUFBLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQ3JCLE9BQU8sQ0FBQyxPQUFPLG1DQUNmLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO3dDQUNaLE9BQU8sQ0FBQyxRQUFRO3NDQUNsQixNQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQ3ZCLE9BQU8sQ0FBQyxNQUFNLG1DQUNkLFlBQVk7d0RBQ2dCLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlCLFNBQVMsQ0FBQyxRQUFRLENBQ2QsSUFBSSxFQUNVLENBQUMsQ0FBQyxNQUFNLENBQ3pCLENBQUM7Z0JBQ0YsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLENBQUM7dURBQzBCLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLFNBQVMsQ0FBQyxRQUFRLENBQ2QsSUFBSSxFQUNVLENBQUMsQ0FBQyxNQUFNLENBQ3pCLENBQUM7Z0JBQ0YsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLENBQUM7Ozs7Ozs7OzswQkFTSCxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OzthQUdqRCxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=