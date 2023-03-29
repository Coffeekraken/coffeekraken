"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
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
                const color = new s_color_1.default((_a = propObj.default) !== null && _a !== void 0 ? _a : '#ff0000', {
                    defaultFormat: (_b = propObj.format) !== null && _b !== void 0 ? _b : 'hexa',
                });
                values = Object.assign(Object.assign({}, color.toObject()), { format: (_c = propObj.format) !== null && _c !== void 0 ? _c : 'hexa', value: (_d = propObj.default) !== null && _d !== void 0 ? _d : color.toString() });
            }
            _console.log('Values', values);
            return (0, lit_1.html) `
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
                                placeholder="Choose a color"
                            />
                            <div class="_color-preview"></div>
                        </s-color-picker>
                        ${component.renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLDZCQUEyQjtBQUUzQixtQkFBeUIsU0FBUztJQUM5QixPQUFPO1FBQ0gsYUFBYSxFQUFFLEtBQUs7UUFDcEIsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUMsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxTQUFTLEVBQUU7b0JBQ3JELGFBQWEsRUFBRSxNQUFBLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLE1BQU07aUJBQzFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLEdBQUcsZ0NBQ0YsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUNuQixNQUFNLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxNQUFNLEVBQ2hDLEtBQUssRUFBRSxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FDN0MsQ0FBQzthQUNMO1lBQ0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFL0IsT0FBTyxJQUFBLFVBQUksRUFBQTs4QkFDTyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs7aUNBRXhDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUN4QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7cUNBR1ksTUFBTSxDQUFDLEtBQUs7c0NBQ1gsTUFBTSxDQUFDLE1BQU07cURBQ0UsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsQ0FBQzs7Ozs7Ozs7OzswQkFVSCxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OzthQUdqRCxDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBakRELDRCQWlEQyJ9