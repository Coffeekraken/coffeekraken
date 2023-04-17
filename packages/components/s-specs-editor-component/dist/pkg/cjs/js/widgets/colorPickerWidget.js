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
        var _a, _b, _c, _d, _e;
        super(deps);
        if (!this.values.value) {
            this.setDefault({
                format: (_c = (_b = (_a = this.propObj.default) === null || _a === void 0 ? void 0 : _a.format) !== null && _b !== void 0 ? _b : this.propObj.format) !== null && _c !== void 0 ? _c : 'hexa',
                value: (_e = (_d = this.propObj.default) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : '#ff0000ff',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLGlEQUFpRDtBQUdqRCwrRUFBeUQ7QUFFekQsTUFBcUIsc0NBQXVDLFNBQVEsNEJBQW9CO0lBQ3BGLFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNaLE1BQU0sRUFDRixNQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sMENBQUUsTUFBTSxtQ0FDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLG1DQUNuQixNQUFNO2dCQUNWLEtBQUssRUFBRSxNQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLDBDQUFFLEtBQUssbUNBQUksV0FBVzthQUNwRCxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxnQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRELE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2tCQUNyRCxJQUFJLENBQUMsV0FBVyxFQUFFOzs2QkFFUCxLQUFLLENBQUMsUUFBUSxFQUFFOzhCQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs2Q0FDSixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7Ozs7OztzQ0FNaUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXOzs7OztTQUtyRCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBdENELHlEQXNDQyJ9