"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
function default_1(component) {
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
                html: (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQztJQUVuQixPQUFPO1FBQ0gsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7WUFDRCxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7O2lDQUVPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4Qix5QkFBeUIsQ0FDNUI7OztxQ0FHWSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7O3lDQUdZLE1BQUEsTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FDckIsT0FBTyxDQUFDLE9BQU8sbUNBQ2YsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7NENBQ1osT0FBTyxDQUFDLFFBQVE7MENBQ2xCLE1BQUEsTUFBQSxNQUFNLENBQUMsTUFBTSxtQ0FDdkIsT0FBTyxDQUFDLE1BQU0sbUNBQ2QsWUFBWTs0REFDZ0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDOUIsU0FBUyxDQUFDLFFBQVEsQ0FDZCxJQUFJLEVBQ1UsQ0FBQyxDQUFDLE1BQU0sQ0FDekIsQ0FBQztvQkFDRixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7MkRBQzBCLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQzdCLFNBQVMsQ0FBQyxRQUFRLENBQ2QsSUFBSSxFQUNVLENBQUMsQ0FBQyxNQUFNLENBQ3pCLENBQUM7b0JBQ0YsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN0QixDQUFDOzs7Ozs7a0RBTWlCLE9BQU8sQ0FBQyxXQUFXOzs7OEJBR3ZDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2lCQUdqRDthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUEvREQsNEJBK0RDIn0=