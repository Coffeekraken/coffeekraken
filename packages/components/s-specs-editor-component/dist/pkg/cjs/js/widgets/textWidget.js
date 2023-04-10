"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_i18n_1 = require("@coffeekraken/s-i18n");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentTextWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        super(deps);
        _console.log('RRR', this.values);
        if (!this.values.value) {
            this.values.value = this.propObj.default;
        }
    }
    validate(newValues) {
        _console.log('validate', newValues);
        if (this.propObj.required && !(newValues === null || newValues === void 0 ? void 0 : newValues.value)) {
            return {
                error: (0, s_i18n_1.__i18n)(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
    }
    render() {
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_text-widget')}">
                ${this.renderLabel()}
                <input
                    @change=${(e) => {
            this.setValue({
                value: e.target.value,
            });
        }}
                    type="text"
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${this.propObj.pladeholder}"
                    path="${this.path.join('.')}"
                    value="${this.values.value}"
                />
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentTextWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRTNCLGlEQUE4QztBQUc5QywrRUFBeUQ7QUFFekQsTUFBcUIsK0JBQWdDLFNBQVEsNEJBQW9CO0lBQzdFLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXBDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUEsRUFBRTtZQUM1QyxPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQywyQkFBMkIsRUFBRTtvQkFDdkMsRUFBRSxFQUFFLGdDQUFnQztpQkFDdkMsQ0FBQzthQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO2tCQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFOzs4QkFFTixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQ3hCLENBQUMsQ0FBQztRQUNQLENBQUM7OzRCQUVPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO21DQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7U0FHckMsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTNDRCxrREEyQ0MifQ==