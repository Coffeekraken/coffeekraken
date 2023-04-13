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
            this.setValue((_a = this.propObj.default) !== null && _a !== void 0 ? _a : {
                value: [],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLCtFQUF5RDtBQUV6RCxpREFBOEM7QUFFOUMsaURBQW9EO0FBRXBELE1BQXFCLG1DQUFvQyxTQUFRLDRCQUFvQjtJQUdqRixZQUFZLElBQTZCOztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FDVCxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQ0FBSTtnQkFDcEIsS0FBSyxFQUFFLEVBQUU7YUFDWixDQUNKLENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUV2RCxXQUFXO1FBQ1gsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25ELE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLDJCQUEyQixFQUFFO29CQUN2QyxFQUFFLEVBQUUsZ0NBQWdDO2lCQUN2QyxDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsTUFBTTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNqRSxPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyx5Q0FBeUMsRUFBRTtvQkFDckQsRUFBRSxFQUFFLG9DQUFvQztvQkFDeEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2pFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLHdDQUF3QyxFQUFFO29CQUNwRCxFQUFFLEVBQUUsb0NBQW9DO29CQUN4QyxNQUFNLEVBQUU7d0JBQ0osSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztxQkFDekI7aUJBQ0osQ0FBQzthQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7a0JBQ2pELElBQUksQ0FBQyxXQUFXLEVBQUU7a0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDdEIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O1lBQUMsT0FBQSxJQUFBLFVBQUksRUFBQTs7cUNBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMxQixRQUFRLEVBQ1IsU0FBUyxDQUNaOztvREFFdUIsTUFBTSxDQUFDLElBQUk7OzswQ0FHckIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2xDO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLENBQUM7d0NBQ08sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7eUNBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMxQixXQUFXLEVBQ1gsWUFBWSxDQUNmOzJDQUNVLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztzQ0FDckMsTUFBQSxNQUFNLENBQUMsRUFBRSxtQ0FBSSxVQUFVLENBQUMsRUFBRTt5Q0FDdkIsTUFBTSxDQUFDLEtBQUs7OztxQkFHaEMsQ0FBQTtTQUFBLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTVGRCxzREE0RkMifQ==