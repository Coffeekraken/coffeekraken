"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentColorPickerWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        var _a, _b;
        super(deps);
        if (!this.values.value) {
            Object.assign(this.values, {
                format: (_a = this.propObj.format) !== null && _a !== void 0 ? _a : 'hexa',
                value: (_b = this.propObj.default) !== null && _b !== void 0 ? _b : '#ff0000ff',
            });
        }
    }
    render() {
        const color = new utils_1.__SColor(this.propObj, this.values);
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_color-picker-widget')}">
                ${this.renderLabel()}
                <s-color-picker
                    value="${color.toString()}"
                    format="${this.propObj.format}"
                    @s-color-picker.change=${(e) => {
            this.setValue(e.detail);
        }}
                >
                    <input
                        type="text"
                        name="color"
                        class="s-input"
                        placeholder=${this.propObj.placeholder}
                    />
                    <div class="_color-preview"></div>
                </s-color-picker>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentColorPickerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLGlEQUFpRDtBQUdqRCwrRUFBeUQ7QUFFekQsTUFBcUIsc0NBQXVDLFNBQVEsNEJBQW9CO0lBQ3BGLFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sRUFBRSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxtQ0FBSSxNQUFNO2dCQUNyQyxLQUFLLEVBQUUsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sbUNBQUksV0FBVzthQUM3QyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxnQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRELE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2tCQUNyRCxJQUFJLENBQUMsV0FBVyxFQUFFOzs2QkFFUCxLQUFLLENBQUMsUUFBUSxFQUFFOzhCQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs2Q0FDSixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7Ozs7OztzQ0FNaUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXOzs7OztTQUtyRCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBcENELHlEQW9DQyJ9