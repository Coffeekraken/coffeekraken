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
        if (!((_a = this.values) === null || _a === void 0 ? void 0 : _a.value)) {
            this.values.value = [];
        }
    }
    validate(newValues) {
        const itemsCount = newValues.value.length;
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
        const select = new utils_1.__SSelect(this.propObj, this.values);
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
                        select.select(option.id);
                    }
                    else {
                        select.unselect(option.id);
                    }
                }
            }
            // apply changes
            this.setValue(this.values);
        }}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_select', 's-select')}"
                    ?multiple=${this.propObj.multiple}
                    placeholder="${this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                >
                    ${this.propObj.options.map((option, i) => {
            var _a;
            return (0, lit_1.html) `
                            <option
                                id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                ?selected=${select.isSelected(option.id)}
                                .selected=${select.isSelected(option.id)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUUzQixpREFBa0Q7QUFHbEQsK0VBQXlEO0FBRXpELE1BQXFCLGlDQUFrQyxTQUFRLDRCQUFvQjtJQUMvRSxZQUFZLElBQTZCOztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRTFDLE1BQU07UUFDTixJQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTO1lBQzlCLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDL0I7WUFDRSxPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyx5Q0FBeUMsRUFBRTtvQkFDckQsRUFBRSxFQUFFLGtDQUFrQztvQkFDdEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUztZQUM5QixVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQy9CO1lBQ0UsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsd0NBQXdDLEVBQUU7b0JBQ3BELEVBQUUsRUFBRSxrQ0FBa0M7b0JBQ3RDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3FCQUN0QjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEQsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7a0JBQy9DLElBQUksQ0FBQyxXQUFXLEVBQUU7OzhCQUVOLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixLQUFLLElBQUksQ0FDTCxDQUFDLEVBQ0QsTUFBTSxFQUNULElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pDLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDckIsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87aUJBQ3RCLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ1QsSUFBSSxNQUFNLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUU7d0JBQzFCLFNBQVM7cUJBQ1o7b0JBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO3dCQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzlCO2lCQUNKO2FBQ0o7WUFFRCxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsQ0FBQzs0QkFDTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO21DQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7c0JBRXpCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDdEIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O1lBQUMsT0FBQSxJQUFBLFVBQUksRUFBQTs7c0NBRUwsTUFBQSxNQUFNLENBQUMsRUFBRSxtQ0FBSSxVQUFVLENBQUMsRUFBRTs0Q0FDcEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDOzRDQUM1QixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7O2tDQUV0QyxNQUFNLENBQUMsSUFBSTs7eUJBRXBCLENBQUE7U0FBQSxDQUNKOzs7U0FHWixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBOUZELG9EQThGQyJ9