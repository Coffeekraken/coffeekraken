"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentSwitchWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            this.values.value = (_a = this.propObj.default) !== null && _a !== void 0 ? _a : false;
        }
    }
    render() {
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_switch-widget')}">
                ${this.renderLabel({})}
                <input
                    @change=${(e) => {
            this.setValue({
                value: e.target.checked,
            });
        }}
                    type="checkbox"
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_switch', 's-switch')}"
                    path="${this.path.join('.')}"
                    ?checked=${this.values.value !== false &&
            this.values.value !== null &&
            this.values.value !== undefined}
                />
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentSwitchWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLCtFQUF5RDtBQUV6RCxNQUFxQixpQ0FBa0MsU0FBUSw0QkFBb0I7SUFDL0UsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLEtBQUssQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7a0JBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDOzs4QkFFUixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2FBQzFCLENBQUMsQ0FBQztRQUNQLENBQUM7OzRCQUVPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDOzRCQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7K0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUs7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSTtZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTOzs7U0FHMUMsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTdCRCxvREE2QkMifQ==