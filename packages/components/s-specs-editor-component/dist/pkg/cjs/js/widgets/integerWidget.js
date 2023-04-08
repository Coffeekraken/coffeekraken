"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_i18n_1 = require("@coffeekraken/s-i18n");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentIntegerWidget extends SSpecsEditorWidget_1.default {
    static isActive() {
        return true;
    }
    constructor(deps) {
        super(deps);
        if (!this.values) {
            this.values = {
                value: this.propObj.default,
            };
        }
    }
    validate(newValues) {
        if (!newValues) {
            return;
        }
        let value = newValues.value;
        // letters in value
        if (Number.isNaN(parseInt(value))) {
            return {
                error: (0, s_i18n_1.__i18n)(`Passed value "%s" is not a valid integer`, {
                    id: 's-specs-editor.widget.integer.invalid',
                    tokens: {
                        s: value,
                    },
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
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_integer-widget')}">
                <label
                    class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
                >
                    <input
                        @change=${(e) => {
            let value = e.target.value;
            this.setValue(value);
            this.editor.apply();
        }}
                        type="number"
                        step="1"
                        min=${this.propObj.min}
                        max=${this.propObj.max}
                        name="${this.path.at(-1)}"
                        class="${this.editor.utils.cls('_input', 's-input')}"
                        placeholder="${this.propObj.placeholder}"
                        path="${this.path.join('.')}"
                        value="${this.values.value}"
                    />
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentIntegerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBSTNCLGlEQUE4QztBQUc5QywrRUFBeUQ7QUFFekQsTUFBcUIsa0NBQW1DLFNBQVEsNEJBQW9CO0lBQ2hGLE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFjO2dCQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2FBQzlCLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixPQUFPO1NBQ1Y7UUFFRCxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBRTVCLG1CQUFtQjtRQUNuQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDL0IsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsMENBQTBDLEVBQUU7b0JBQ3RELEVBQUUsRUFBRSx1Q0FBdUM7b0JBQzNDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsS0FBSztxQkFDWDtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUM5QyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO1FBRUQsTUFBTTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUM1RCxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsMENBQTBDLEVBQUU7b0JBQ3RELEVBQUUsRUFBRSxtQ0FBbUM7b0JBQ3ZDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3FCQUN0QjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsTUFBTTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUM1RCxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsd0NBQXdDLEVBQUU7b0JBQ3BELEVBQUUsRUFBRSxtQ0FBbUM7b0JBQ3ZDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3FCQUN0QjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzs7NkJBRXJDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDMUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7O2tDQUdhLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7OzhCQUdLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs4QkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dDQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO3VDQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0NBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQ0FDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOztzQkFFNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7U0FHN0QsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWhHRCxxREFnR0MifQ==