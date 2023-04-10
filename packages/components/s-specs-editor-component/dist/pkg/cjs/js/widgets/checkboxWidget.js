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
        super(deps);
        if (!this.values.value) {
            this.values.value = [];
        }
    }
    validate(newValues) {
        _console.log('S', newValues);
        const itemsCount = Object.keys(newValues.value).length;
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
        const checkbox = new utils_1.__SCheckbox(this.propObj, this.values);
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
                    checkbox.check(option);
                }
                else {
                    checkbox.uncheck(option);
                }
                this.setValue(this.values);
            }}
                                name="${this.path.at(-1)}"
                                class="${this.editor.utils.cls('_checkbox', 's-checkbox')}"
                                ?checked=${checkbox.isChecked(option)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLCtFQUF5RDtBQUV6RCxpREFBOEM7QUFFOUMsaURBQW9EO0FBRXBELE1BQXFCLG1DQUFvQyxTQUFRLDRCQUFvQjtJQUNqRixZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQVM7UUFDZCxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUU3QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFdkQsTUFBTTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNqRSxPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyx5Q0FBeUMsRUFBRTtvQkFDckQsRUFBRSxFQUFFLG9DQUFvQztvQkFDeEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2pFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLHdDQUF3QyxFQUFFO29CQUNwRCxFQUFFLEVBQUUsb0NBQW9DO29CQUN4QyxNQUFNLEVBQUU7d0JBQ0osSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztxQkFDekI7aUJBQ0osQ0FBQzthQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVELE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2tCQUNqRCxJQUFJLENBQUMsV0FBVyxFQUFFO2tCQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3RCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztZQUFDLE9BQUEsSUFBQSxVQUFJLEVBQUE7O3FDQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDMUIsUUFBUSxFQUNSLFNBQVMsQ0FDWjs7b0RBRXVCLE1BQU0sQ0FBQyxJQUFJOzs7MENBR3JCLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDbEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDMUI7cUJBQU07b0JBQ0gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDNUI7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsQ0FBQzt3Q0FDTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5Q0FDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzFCLFdBQVcsRUFDWCxZQUFZLENBQ2Y7MkNBQ1UsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7c0NBQy9CLE1BQUEsTUFBTSxDQUFDLEVBQUUsbUNBQUksVUFBVSxDQUFDLEVBQUU7eUNBQ3ZCLE1BQU0sQ0FBQyxLQUFLOzs7cUJBR2hDLENBQUE7U0FBQSxDQUNKOztTQUVSLENBQUM7SUFDTixDQUFDO0NBQ0o7QUEvRUQsc0RBK0VDIn0=