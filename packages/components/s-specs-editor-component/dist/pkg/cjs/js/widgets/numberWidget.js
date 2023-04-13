"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const lit_1 = require("lit");
const is_1 = require("@coffeekraken/sugar/is");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentNumberWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        super(deps);
        if (this.values.value === undefined && this.propObj.default) {
            this.setValue(this.propObj.default);
        }
    }
    validate(newValues) {
        let value = newValues.value;
        // letters in value
        if (this.propObj.required && !(0, is_1.__isValidNumber)(value)) {
            return {
                error: (0, s_i18n_1.__i18n)(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
        // letters in value
        if (`${parseFloat(value)}`.length !== value.length) {
            value = parseFloat(value);
        }
        // min
        if (this.propObj.min !== undefined && value < this.propObj.min) {
            return {
                error: (0, s_i18n_1.__i18n)(`The value must be greater or equal to %s`, {
                    id: 's-specs-editor.widget.number.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }
        // max
        if (this.propObj.max !== undefined && value > this.propObj.max) {
            return {
                error: (0, s_i18n_1.__i18n)(`The value must be lower or equal to %s`, {
                    id: 's-specs-editor.widget.number.max',
                    tokens: {
                        s: this.propObj.max,
                    },
                }),
            };
        }
    }
    render() {
        var _a;
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_number-widget')}">
                ${this.renderLabel()}
                <input
                    @change=${(e) => {
            let value = parseFloat(e.target.value);
            this.setValue({
                value,
            });
        }}
                    type="number"
                    step="0.1"
                    min=${this.propObj.min}
                    max=${this.propObj.max}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${(_a = this.propObj.default) !== null && _a !== void 0 ? _a : this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                    value="${this.values.value}"
                />
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentNumberWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUUzQiwrQ0FBeUQ7QUFHekQsK0VBQXlEO0FBRXpELE1BQXFCLGlDQUFrQyxTQUFRLDRCQUFvQjtJQUMvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFFNUIsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFBLG9CQUFlLEVBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEQsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsMkJBQTJCLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxnQ0FBZ0M7aUJBQ3ZDLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hELEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzVELE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLDBDQUEwQyxFQUFFO29CQUN0RCxFQUFFLEVBQUUsa0NBQWtDO29CQUN0QyxNQUFNLEVBQUU7d0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztxQkFDdEI7aUJBQ0osQ0FBQzthQUNMLENBQUM7U0FDTDtRQUVELE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDNUQsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsd0NBQXdDLEVBQUU7b0JBQ3BELEVBQUUsRUFBRSxrQ0FBa0M7b0JBQ3RDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3FCQUN0QjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07O1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7a0JBQy9DLElBQUksQ0FBQyxXQUFXLEVBQUU7OzhCQUVOLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUs7YUFDUixDQUFDLENBQUM7UUFDUCxDQUFDOzs7MEJBR0ssSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzBCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7NEJBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7bUNBQ3BDLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7U0FHckMsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTVFRCxvREE0RUMifQ==