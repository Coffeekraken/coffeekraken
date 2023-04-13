"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentHtmlWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            this.setValue((_a = this.propObj.default) !== null && _a !== void 0 ? _a : {
                value: '',
            });
        }
    }
    render() {
        var _a, _b;
        return (0, lit_1.html) `
            <div class="${this.editor.utils.cls('_html-widget')}">
                ${this.renderLabel()}

                <textarea
                    rows="5"
                    @change=${(e) => this.editor._update(this.path, this.propObj, e)}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${(_b = (_a = this.propObj.default) !== null && _a !== void 0 ? _a : this.propObj.title) !== null && _b !== void 0 ? _b : this.propObj.id}"
                    path="${this.path.join('.')}"
                >
${this.values.value}</textarea
                >
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentHtmlWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBSTNCLCtFQUF5RDtBQUV6RCxNQUFxQiwrQkFBZ0MsU0FBUSw0QkFBb0I7SUFDN0UsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQ1QsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sbUNBQUk7Z0JBQ3BCLEtBQUssRUFBRSxFQUFFO2FBQ1osQ0FDSixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTTs7UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7a0JBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUU7Ozs7OEJBSU4sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO21DQUNwQyxNQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssbUNBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O0VBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSzs7O1NBR1YsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWxDRCxrREFrQ0MifQ==