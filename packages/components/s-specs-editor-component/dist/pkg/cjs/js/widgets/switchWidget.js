"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentSwitchWidget extends SSpecsEditorWidget_1.default {
    static isActive() {
        return true;
    }
    constructor(deps) {
        var _a;
        super(deps);
        _console.log('S', this.values);
        if (!this.values.value) {
            this.values.value = (_a = this.propObj.default) !== null && _a !== void 0 ? _a : false;
        }
    }
    render() {
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_switch-widget')}">
                <label class="${this.editor.utils.cls('_label', 's-label')}">
                    <input
                        @change=${(e) => {
            this.setValue({
                value: e.target.checked,
            });
            this.editor.apply();
        }}
                        type="checkbox"
                        name="${this.path.at(-1)}"
                        class="${this.editor.utils.cls('_switch', 's-switch')}"
                        path="${this.path.join('.')}"
                        ?checked=${this.values.value !== false &&
            this.values.value !== null &&
            this.values.value !== undefined}
                    />
                    ${this.editor.renderLabel(this.propObj, this.path, {
            tooltip: 'right',
        })}
                </label>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentSwitchWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRzNCLCtFQUF5RDtBQUV6RCxNQUFxQixpQ0FBa0MsU0FBUSw0QkFBb0I7SUFDL0UsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQ0FBSSxLQUFLLENBQUM7U0FDckQ7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2dDQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzs7a0NBRXhDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87YUFDMUIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDOztnQ0FFTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztnQ0FDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO21DQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxLQUFLO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUk7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUzs7c0JBRWpDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUMvQyxPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDOzs7U0FHYixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekNELG9EQXlDQyJ9