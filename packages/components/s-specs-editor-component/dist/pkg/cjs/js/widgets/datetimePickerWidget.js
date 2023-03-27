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
            var _a, _b;
            if (!values) {
                values = {};
            }
            return (0, lit_1.html) `
                <div class="${component.utils.cls('_datetime-picker')}">
                    <label
                        class="${component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        <s-datetime-picker
                            value="${(_a = values.value) !== null && _a !== void 0 ? _a : new Date().toISOString()}"
                            format="${(_b = values.format) !== null && _b !== void 0 ? _b : 'YYYY-MM-DD'}"
                            @s-datetime-picker.change=${(e) => {
                _console.log('e', e);
                // component.setValue(path, {
                //     ...values,
                //     value: e.detail[
                //         values.format ?? 'hexa'
                //     ],
                // });
                // component.apply();
            }}
                        >
                            <input
                                type="text"
                                name="datetime"
                                class="s-input"
                                placeholder="Choose a datetime"
                            />
                        </s-datetime-picker>
                        ${component._renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLG1CQUF5QixTQUFTO0lBQzlCLE9BQU87UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtZQUNELE9BQU8sSUFBQSxVQUFJLEVBQUE7OEJBQ08sU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7O2lDQUVwQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7O3FDQUdZLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7c0NBQ3ZDLE1BQUEsTUFBTSxDQUFDLE1BQU0sbUNBQUksWUFBWTt3REFDWCxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM5QixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFckIsNkJBQTZCO2dCQUM3QixpQkFBaUI7Z0JBQ2pCLHVCQUF1QjtnQkFDdkIsa0NBQWtDO2dCQUNsQyxTQUFTO2dCQUNULE1BQU07Z0JBQ04scUJBQXFCO1lBQ3pCLENBQUM7Ozs7Ozs7OzswQkFTSCxTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OzthQUdsRCxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBOUNELDRCQThDQyJ9