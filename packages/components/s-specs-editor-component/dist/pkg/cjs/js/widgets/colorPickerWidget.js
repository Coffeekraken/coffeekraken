"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
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
                const color = new s_color_1.default((_a = propObj.default) !== null && _a !== void 0 ? _a : '#ff0000', {
                    defaultFormat: (_b = propObj.format) !== null && _b !== void 0 ? _b : 'hexa',
                });
                values = Object.assign(Object.assign({}, color.toObject()), { format: (_c = propObj.format) !== null && _c !== void 0 ? _c : 'hexa', value: (_d = propObj.default) !== null && _d !== void 0 ? _d : color.toString() });
            }
            return {
                error,
                warning,
                html: (0, lit_1.html) `
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLDZCQUEyQjtBQUUzQixtQkFBeUIsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O1lBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQUksU0FBUyxFQUFFO29CQUNyRCxhQUFhLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxNQUFNO2lCQUMxQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxHQUFHLGdDQUNGLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FDbkIsTUFBTSxFQUFFLE1BQUEsT0FBTyxDQUFDLE1BQU0sbUNBQUksTUFBTSxFQUNoQyxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQzdDLENBQUM7YUFDTDtZQUVELE9BQU87Z0JBQ0gsS0FBSztnQkFDTCxPQUFPO2dCQUNQLElBQUksRUFBRSxJQUFBLFVBQUksRUFBQTtrQ0FDUSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs7cUNBRXhDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7eUNBR1ksTUFBTSxDQUFDLEtBQUs7MENBQ1gsTUFBTSxDQUFDLE1BQU07eURBQ0UsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDM0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM1QyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Ozs7OztrREFNaUIsT0FBTyxDQUFDLFdBQVc7Ozs7OEJBSXZDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O2lCQUdqRDthQUNKLENBQUM7UUFDTixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFyREQsNEJBcURDIn0=