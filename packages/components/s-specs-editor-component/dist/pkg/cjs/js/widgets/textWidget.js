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
        if (!this.values.value) {
            this.values.value = this.propObj.default;
        }
    }
    validate(newValues) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRTNCLGlEQUE4QztBQUc5QywrRUFBeUQ7QUFFekQsTUFBcUIsK0JBQWdDLFNBQVEsNEJBQW9CO0lBQzdFLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTO1FBQ2QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUEsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQzVDLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLDJCQUEyQixFQUFFO29CQUN2QyxFQUFFLEVBQUUsZ0NBQWdDO2lCQUN2QyxDQUFDO2FBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7a0JBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUU7OzhCQUVOLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7YUFDeEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7NEJBRU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7bUNBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVzs0QkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzZCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7OztTQUdyQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBdENELGtEQXNDQyJ9