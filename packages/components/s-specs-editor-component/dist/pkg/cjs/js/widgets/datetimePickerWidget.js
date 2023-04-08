"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentDatetimePickerWidget extends SSpecsEditorWidget_1.default {
    static isActive() {
        return true;
    }
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            Object.assign(this.values, {
                value: this.propObj.default,
                format: (_a = this.propObj.format) !== null && _a !== void 0 ? _a : 'YYYY-MM-DD',
            });
        }
    }
    render() {
        const datetime = new utils_1.__SDatetime(this.propObj, this.values);
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_datetime-picker-widget')}">
                <label
                    class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
                >
                    <s-datetime-picker
                        value="${this.values.value}"
                        ?calendar=${this.propObj.calendar}
                        format="${this.values.format}"
                        @s-datetime-picker.change=${(e) => {
            this.setValue(e.detail);
            this.editor.apply();
        }}
                        @s-datetime-picker.reset=${(e) => {
            this.setValue(e.detail);
            this.editor.apply();
        }}
                    >
                        <input
                            type="text"
                            name="datetime"
                            class="s-input"
                            placeholder=${this.propObj.placeholder}
                        />
                    </s-datetime-picker>
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentDatetimePickerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNkJBQTJCO0FBRTNCLGlEQUFvRDtBQUdwRCwrRUFBeUQ7QUFFekQsTUFBcUIseUNBQTBDLFNBQVEsNEJBQW9CO0lBQ3ZGLE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Z0JBQzNCLE1BQU0sRUFBRSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxtQ0FBSSxZQUFZO2FBQzlDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUQsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7OzZCQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzFCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztpQ0FHWSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7b0NBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO2tDQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07b0RBQ0EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLENBQUM7bURBQzBCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7Ozs7MENBTWlCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVzs7O3NCQUc1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7OztTQUc3RCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBcERELDREQW9EQyJ9