"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
class SSpecsEditorComponentDatetimePickerWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    render({ propObj, values, path }) {
        var _a;
        if (!values) {
            values = {
                value: propObj.default,
                format: (_a = propObj.format) !== null && _a !== void 0 ? _a : 'YYYY-MM-DD',
            };
        }
        const datetime = new utils_1.__SDatetime(propObj, values);
        return (0, lit_1.html) `
            <div
                class="${this._component.utils.cls('_datetime-picker-widget')}"
            >
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    <s-datetime-picker
                        value="${values.value}"
                        ?calendar=${propObj.calendar}
                        format="${values.format}"
                        @s-datetime-picker.change=${(e) => {
            this._component.setValue(path, e.detail);
            this._component.apply();
        }}
                        @s-datetime-picker.reset=${(e) => {
            this._component.setValue(path, e.detail);
            this._component.apply();
        }}
                    >
                        <input
                            type="text"
                            name="datetime"
                            class="s-input"
                            placeholder=${propObj.placeholder}
                        />
                    </s-datetime-picker>
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentDatetimePickerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQTJCO0FBRTNCLGlEQUFvRDtBQUlwRCxNQUFxQix5Q0FBeUM7SUFLMUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBbUI7Z0JBQ3JCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTztnQkFDdEIsTUFBTSxFQUFFLE1BQUEsT0FBTyxDQUFDLE1BQU0sbUNBQUksWUFBWTthQUN6QyxDQUFDO1NBQ0w7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBQSxVQUFJLEVBQUE7O3lCQUVNLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzs7OzZCQUdoRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztpQ0FHWSxNQUFNLENBQUMsS0FBSztvQ0FDVCxPQUFPLENBQUMsUUFBUTtrQ0FDbEIsTUFBTSxDQUFDLE1BQU07b0RBQ0ssQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxFQUNVLENBQUMsQ0FBQyxNQUFNLENBQ3pCLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7bURBQzBCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3BCLElBQUksRUFDVSxDQUFDLENBQUMsTUFBTSxDQUN6QixDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7Ozs7MENBTWlCLE9BQU8sQ0FBQyxXQUFXOzs7c0JBR3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OztTQUd2RCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbEVELDREQWtFQyJ9