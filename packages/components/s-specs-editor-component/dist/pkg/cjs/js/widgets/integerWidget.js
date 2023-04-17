"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_i18n_1 = require("@coffeekraken/s-i18n");
const is_1 = require("@coffeekraken/sugar/is");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentIntegerWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        super(deps);
        if (this.values.value === undefined && this.propObj.default) {
            this.setDefault(this.propObj.default);
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
        if (`${parseInt(value)}`.length !== value.length) {
            value = parseInt(value);
        }
        // min
        if (this.propObj.min !== undefined && value < this.propObj.min) {
            value = this.propObj.min;
            return {
                error: (0, s_i18n_1.__i18n)(`The value must be greater or equal to %s`, {
                    id: 's-specs-editor.widget.integer.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }
        // max
        if (this.propObj.max !== undefined && value > this.propObj.max) {
            value = this.propObj.max;
            return {
                error: (0, s_i18n_1.__i18n)(`The value must be lower or equal to %s`, {
                    id: 's-specs-editor.widget.integer.max',
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
            <div class="${this.editor.utils.cls('_integer-widget')}">
                ${this.renderLabel()}
                <input
                    @change=${(e) => {
            let value = parseInt(e.target.value);
            this.setValue({
                value,
            });
        }}
                    type="number"
                    step="1"
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
exports.default = SSpecsEditorComponentIntegerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRTNCLGlEQUE4QztBQUU5QywrQ0FBeUQ7QUFHekQsK0VBQXlEO0FBRXpELE1BQXFCLGtDQUFtQyxTQUFRLDRCQUFvQjtJQUNoRixZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFFNUIsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFBLG9CQUFlLEVBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEQsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsMkJBQTJCLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxnQ0FBZ0M7aUJBQ3ZDLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzlDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzVELEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN6QixPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQywwQ0FBMEMsRUFBRTtvQkFDdEQsRUFBRSxFQUFFLG1DQUFtQztvQkFDdkMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzVELEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN6QixPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyx3Q0FBd0MsRUFBRTtvQkFDcEQsRUFBRSxFQUFFLG1DQUFtQztvQkFDdkMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTTs7UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztrQkFDaEQsSUFBSSxDQUFDLFdBQVcsRUFBRTs7OEJBRU4sQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSzthQUNSLENBQUMsQ0FBQztRQUNQLENBQUM7OzswQkFHSyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7MEJBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs0QkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzttQ0FDcEMsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sbUNBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVzs0QkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzZCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7OztTQUdyQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBOUVELHFEQThFQyJ9