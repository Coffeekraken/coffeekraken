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
        return {
            error: this._error,
            warning: this._warning,
            html: (0, lit_1.html) `
                <div
                    class="${this._component.utils.cls('_color-picker-widget')}"
                >
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
            `,
        };
    }
}
exports.default = SSpecsEditorComponentColorPickerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRzNCLGlEQUFpRDtBQUVqRCxNQUFxQixzQ0FBc0M7SUFPdkQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBZ0I7Z0JBQ2xCLE1BQU0sRUFBRSxNQUFBLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLE1BQU07Z0JBQ2hDLEtBQUssRUFBRSxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLFdBQVc7YUFDeEMsQ0FBQztTQUNMO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxnQkFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1QyxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7OzZCQUVPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs7O2lDQUc3QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztxQ0FHWSxLQUFLLENBQUMsUUFBUSxFQUFFO3NDQUNmLE9BQU8sQ0FBQyxNQUFNO3FEQUNDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUNwQixJQUFJLEVBQ1MsQ0FBQyxDQUFDLE1BQU0sQ0FDeEIsQ0FBQztnQkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLENBQUM7Ozs7Ozs4Q0FNaUIsT0FBTyxDQUFDLFdBQVc7Ozs7MEJBSXZDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OzthQUd2RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFqRUQseURBaUVDIn0=