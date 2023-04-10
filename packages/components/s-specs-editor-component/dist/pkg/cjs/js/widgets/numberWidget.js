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
        if (this.values.value === undefined) {
            this.values.value = this.propObj.default;
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
                    placeholder="${this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                    value="${this.values.value}"
                />
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentNumberWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUUzQiwrQ0FBeUQ7QUFHekQsK0VBQXlEO0FBRXpELE1BQXFCLGlDQUFrQyxTQUFRLDRCQUFvQjtJQUMvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTO1FBQ2QsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUU1QixtQkFBbUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUEsb0JBQWUsRUFBQyxLQUFLLENBQUMsRUFBRTtZQUNsRCxPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQywyQkFBMkIsRUFBRTtvQkFDdkMsRUFBRSxFQUFFLGdDQUFnQztpQkFDdkMsQ0FBQzthQUNMLENBQUM7U0FDTDtRQUVELG1CQUFtQjtRQUNuQixJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEQsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUVELE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDNUQsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsMENBQTBDLEVBQUU7b0JBQ3RELEVBQUUsRUFBRSxrQ0FBa0M7b0JBQ3RDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3FCQUN0QjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsTUFBTTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUM1RCxPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyx3Q0FBd0MsRUFBRTtvQkFDcEQsRUFBRSxFQUFFLGtDQUFrQztvQkFDdEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2tCQUMvQyxJQUFJLENBQUMsV0FBVyxFQUFFOzs4QkFFTixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFLO2FBQ1IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7OzBCQUdLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzswQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzRCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO21DQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7U0FHckMsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTNFRCxvREEyRUMifQ==