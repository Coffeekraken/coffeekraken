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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNkJBQTJCO0FBRTNCLGlEQUFvRDtBQUdwRCwrRUFBeUQ7QUFFekQsTUFBcUIseUNBQTBDLFNBQVEsNEJBQW9CO0lBQ3ZGLFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Z0JBQzNCLE1BQU0sRUFBRSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxtQ0FBSSxZQUFZO2FBQzlDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUQsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7a0JBQ3hELElBQUksQ0FBQyxXQUFXLEVBQUU7OzZCQUVQLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztnQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7OEJBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtnREFDQSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7K0NBQzBCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7Ozs7O3NDQU1pQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Ozs7U0FJckQsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXZDRCw0REF1Q0MifQ==