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
        return {
            error: this._error,
            warning: this._warning,
            html: (0, lit_1.html) `
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
            `,
        };
    }
}
exports.default = SSpecsEditorComponentDatetimePickerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQTJCO0FBRTNCLGlEQUFvRDtBQUlwRCxNQUFxQix5Q0FBeUM7SUFPMUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBbUI7Z0JBQ3JCLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTztnQkFDdEIsTUFBTSxFQUFFLE1BQUEsT0FBTyxDQUFDLE1BQU0sbUNBQUksWUFBWTthQUN6QyxDQUFDO1NBQ0w7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWxELE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFBLFVBQUksRUFBQTs7NkJBRU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5Qix5QkFBeUIsQ0FDNUI7OztpQ0FHWSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztxQ0FHWSxNQUFNLENBQUMsS0FBSzt3Q0FDVCxPQUFPLENBQUMsUUFBUTtzQ0FDbEIsTUFBTSxDQUFDLE1BQU07d0RBQ0ssQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3BCLElBQUksRUFDVSxDQUFDLENBQUMsTUFBTSxDQUN6QixDQUFDO2dCQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsQ0FBQzt1REFDMEIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3BCLElBQUksRUFDVSxDQUFDLENBQUMsTUFBTSxDQUN6QixDQUFDO2dCQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsQ0FBQzs7Ozs7OzhDQU1pQixPQUFPLENBQUMsV0FBVzs7OzBCQUd2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7YUFHdkQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBMUVELDREQTBFQyJ9