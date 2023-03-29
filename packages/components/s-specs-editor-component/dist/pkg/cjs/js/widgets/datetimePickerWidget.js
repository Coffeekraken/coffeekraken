"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
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
            return (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtZQUNELE9BQU8sSUFBQSxVQUFJLEVBQUE7OEJBQ08sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7O2lDQUUzQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7O3FDQUdZLE1BQUEsTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FDckIsT0FBTyxDQUFDLE9BQU8sbUNBQ2YsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7d0NBQ1osT0FBTyxDQUFDLFFBQVE7c0NBQ2xCLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FDdkIsT0FBTyxDQUFDLE1BQU0sbUNBQ2QsWUFBWTt3REFDZ0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsU0FBUyxDQUFDLFFBQVEsQ0FDZCxJQUFJLEVBQ1UsQ0FBQyxDQUFDLE1BQU0sQ0FDekIsQ0FBQztnQkFDRixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQzt1REFDMEIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDN0IsU0FBUyxDQUFDLFFBQVEsQ0FDZCxJQUFJLEVBQ1UsQ0FBQyxDQUFDLE1BQU0sQ0FDekIsQ0FBQztnQkFDRixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQzs7Ozs7Ozs7OzBCQVNILFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2FBR2pELENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF0REQsNEJBc0RDIn0=