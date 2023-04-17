"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
const s_i18n_1 = require("@coffeekraken/s-i18n");
const utils_1 = require("@specimen/types/utils");
class SSpecsEditorComponentCheckboxWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            this.setDefault((_a = this.propObj.default) !== null && _a !== void 0 ? _a : {
                value: [],
            }, {
                validate: false,
            });
        }
        this._checkbox = new utils_1.__SCheckbox(this.propObj, this.values);
    }
    validate(newValues) {
        const itemsCount = Object.keys(newValues.value).length;
        // required
        if (this.propObj.required && this._checkbox.isEmpty()) {
            return {
                error: (0, s_i18n_1.__i18n)(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
        // min
        if (this.propObj.min !== undefined && itemsCount < this.propObj.min) {
            return {
                error: (0, s_i18n_1.__i18n)('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }
        // max
        if (this.propObj.max !== undefined && itemsCount > this.propObj.max) {
            return {
                error: (0, s_i18n_1.__i18n)('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.max',
                    tokens: {
                        '%s': this.propObj.max,
                    },
                }),
            };
        }
    }
    render() {
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_checkbox-widget')}">
                ${this.renderLabel()}
                ${this.propObj.options.map((option, i) => {
            var _a;
            return (0, lit_1.html) `
                        <label
                            class="${this.editor.utils.cls('_label', 's-label')}"
                        >
                            <span class="_option">${option.name}</span>
                            <input
                                type="checkbox"
                                @change=${(e) => {
                if (e.target.checked) {
                    this._checkbox.check(option);
                }
                else {
                    this._checkbox.uncheck(option);
                }
                this.setValue(this.values);
            }}
                                name="${this.path.at(-1)}"
                                class="${this.editor.utils.cls('_checkbox', 's-checkbox')}"
                                ?checked=${this._checkbox.isChecked(option)}
                                id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                .value=${option.value}
                            />
                        </label>
                    `;
        })}
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentCheckboxWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLCtFQUF5RDtBQUV6RCxpREFBOEM7QUFFOUMsaURBQW9EO0FBRXBELE1BQXFCLG1DQUFvQyxTQUFRLDRCQUFvQjtJQUdqRixZQUFZLElBQTZCOztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FDWCxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQ0FBSTtnQkFDcEIsS0FBSyxFQUFFLEVBQUU7YUFDWixFQUNEO2dCQUNJLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQ0osQ0FBQztTQUNMO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTO1FBQ2QsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXZELFdBQVc7UUFDWCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkQsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsMkJBQTJCLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxnQ0FBZ0M7aUJBQ3ZDLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2pFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLHlDQUF5QyxFQUFFO29CQUNyRCxFQUFFLEVBQUUsb0NBQW9DO29CQUN4QyxNQUFNLEVBQUU7d0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztxQkFDdEI7aUJBQ0osQ0FBQzthQUNMLENBQUM7U0FDTDtRQUVELE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDakUsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsd0NBQXdDLEVBQUU7b0JBQ3BELEVBQUUsRUFBRSxvQ0FBb0M7b0JBQ3hDLE1BQU0sRUFBRTt3QkFDSixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3FCQUN6QjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztrQkFDakQsSUFBSSxDQUFDLFdBQVcsRUFBRTtrQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN0QixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7WUFBQyxPQUFBLElBQUEsVUFBSSxFQUFBOztxQ0FFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzFCLFFBQVEsRUFDUixTQUFTLENBQ1o7O29EQUV1QixNQUFNLENBQUMsSUFBSTs7OzBDQUdyQixDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNaLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNoQztxQkFBTTtvQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbEM7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsQ0FBQzt3Q0FDTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5Q0FDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzFCLFdBQVcsRUFDWCxZQUFZLENBQ2Y7MkNBQ1UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO3NDQUNyQyxNQUFBLE1BQU0sQ0FBQyxFQUFFLG1DQUFJLFVBQVUsQ0FBQyxFQUFFO3lDQUN2QixNQUFNLENBQUMsS0FBSzs7O3FCQUdoQyxDQUFBO1NBQUEsQ0FDSjs7U0FFUixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBL0ZELHNEQStGQyJ9