"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentSelectWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            this.setValue((_a = this.propObj.default) !== null && _a !== void 0 ? _a : {
                value: [],
            }, {
                validate: false,
            });
        }
        this._select = new utils_1.__SSelect(this.propObj, this.values);
    }
    validate(newValues) {
        const itemsCount = newValues.value.length;
        // required
        if (this.propObj.required && this._select.isEmpty()) {
            return {
                error: (0, s_i18n_1.__i18n)(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
        // min
        if (this.propObj.multiple &&
            this.propObj.min !== undefined &&
            itemsCount < this.propObj.min) {
            return {
                error: (0, s_i18n_1.__i18n)('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.select.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }
        // max
        if (this.propObj.multiple &&
            this.propObj.max !== undefined &&
            itemsCount > this.propObj.max) {
            return {
                error: (0, s_i18n_1.__i18n)('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.select.max',
                    tokens: {
                        s: this.propObj.max,
                    },
                }),
            };
        }
    }
    render() {
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_select-widget')}">
                ${this.renderLabel()}
                <select
                    @change=${(e) => {
            for (let [i, option,] of this.propObj.options.entries()) {
                for (let [j, $option] of [
                    ...e.target.options,
                ].entries()) {
                    if (option.id !== $option.id) {
                        continue;
                    }
                    if ($option.selected) {
                        this._select.select(option.id);
                    }
                    else {
                        this._select.unselect(option.id);
                    }
                }
            }
            // apply changes
            this.setValue(this.values);
        }}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_select', 's-select')} ${!this.propObj.required &&
            this._select.isEmpty() &&
            this.propObj.placeholder
            ? 'placeholder'
            : ''}"
                    ?multiple=${this.propObj.multiple}
                    placeholder="${this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                    ?required=${this.propObj.required}
                >
                    ${this.propObj.placeholder
            ? (0, lit_1.html) `
                              <option
                                  value=""
                                  disabled
                                  ?selected=${this._select.isEmpty()}
                              >
                                  ${this.propObj.placeholder}
                              </option>
                          `
            : ''}
                    ${this.propObj.options.map((option, i) => {
            var _a;
            return (0, lit_1.html) `
                            <option
                                id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                ?selected=${this._select.isSelected(option.id)}
                                .selected=${this._select.isSelected(option.id)}
                            >
                                ${option.name}
                            </option>
                        `;
        })}
                </select>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentSelectWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUUzQixpREFBa0Q7QUFHbEQsK0VBQXlEO0FBRXpELE1BQXFCLGlDQUFrQyxTQUFRLDRCQUFvQjtJQUcvRSxZQUFZLElBQTZCOztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FDVCxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQ0FBSTtnQkFDcEIsS0FBSyxFQUFFLEVBQUU7YUFDWixFQUNEO2dCQUNJLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLENBQ0osQ0FBQztTQUNMO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTO1FBQ2QsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFMUMsV0FBVztRQUNYLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNqRCxPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQywyQkFBMkIsRUFBRTtvQkFDdkMsRUFBRSxFQUFFLGdDQUFnQztpQkFDdkMsQ0FBQzthQUNMLENBQUM7U0FDTDtRQUVELE1BQU07UUFDTixJQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTO1lBQzlCLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFD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