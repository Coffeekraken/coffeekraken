"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentDatetimePickerWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        var _a, _b, _c, _d;
        super(deps);
        if (!this.values.value) {
            this.setValue({
                format: (_c = (_b = (_a = this.propObj.default) === null || _a === void 0 ? void 0 : _a.format) !== null && _b !== void 0 ? _b : this.propObj.format) !== null && _c !== void 0 ? _c : 'YYYY-MM-DD',
                value: (_d = this.propObj.default) === null || _d === void 0 ? void 0 : _d.value,
            });
        }
    }
    render() {
        const datetime = new utils_1.__SDatetime(this.propObj, this.values);
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_datetime-picker-widget')}">
                ${this.renderLabel()}
                <s-datetime-picker
                    value="${this.values.value}"
                    ?calendar=${this.propObj.calendar}
                    format="${this.values.format}"
                    @s-datetime-picker.change=${(e) => {
            this.setValue(e.detail);
        }}
                    @s-datetime-picker.reset=${(e) => {
            this.setValue(e.detail);
        }}
                >
                    <input
                        type="text"
                        name="datetime"
                        class="s-input"
                        placeholder=${this.propObj.placeholder}
                    />
                </s-datetime-picker>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentDatetimePickerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNkJBQTJCO0FBRTNCLGlEQUFvRDtBQUdwRCwrRUFBeUQ7QUFFekQsTUFBcUIseUNBQTBDLFNBQVEsNEJBQW9CO0lBQ3ZGLFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLE1BQU0sRUFDRixNQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sMENBQUUsTUFBTSxtQ0FDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLG1DQUNuQixZQUFZO2dCQUNoQixLQUFLLEVBQUUsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sMENBQUUsS0FBSzthQUNyQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVELE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2tCQUN4RCxJQUFJLENBQUMsV0FBVyxFQUFFOzs2QkFFUCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0NBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFROzhCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Z0RBQ0EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDOytDQUMwQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7Ozs7OztzQ0FNaUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXOzs7O1NBSXJELENBQUM7SUFDTixDQUFDO0NBQ0o7QUExQ0QsNERBMENDIn0=