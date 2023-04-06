"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
class SSpecsEditorComponentColorPickerWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    render({ propObj, values, path }) {
        var _a, _b;
        if (!values) {
            values = {
                format: (_a = propObj.format) !== null && _a !== void 0 ? _a : 'hexa',
                value: (_b = propObj.default) !== null && _b !== void 0 ? _b : '#ff0000ff',
            };
        }
        const color = new utils_1.__SColor(propObj, values);
        return (0, lit_1.html) `
            <div class="${this._component.utils.cls('_color-picker-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    <s-color-picker
                        value="${color.toString()}"
                        format="${propObj.format}"
                        @s-color-picker.change=${(e) => {
            this._component.setValue(path, e.detail);
            this._component.apply();
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
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentColorPickerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRzNCLGlEQUFpRDtBQUVqRCxNQUFxQixzQ0FBc0M7SUFLdkQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBZ0I7Z0JBQ2xCLE1BQU0sRUFBRSxNQUFBLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLE1BQU07Z0JBQ2hDLEtBQUssRUFBRSxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLFdBQVc7YUFDeEMsQ0FBQztTQUNMO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxnQkFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1QyxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs7NkJBRTlDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7O2lDQUdZLEtBQUssQ0FBQyxRQUFRLEVBQUU7a0NBQ2YsT0FBTyxDQUFDLE1BQU07aURBQ0MsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxFQUNTLENBQUMsQ0FBQyxNQUFNLENBQ3hCLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7Ozs7OzswQ0FNaUIsT0FBTyxDQUFDLFdBQVc7Ozs7c0JBSXZDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OztTQUd2RCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekRELHlEQXlEQyJ9