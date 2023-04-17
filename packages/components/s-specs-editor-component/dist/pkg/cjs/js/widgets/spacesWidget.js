"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_spaces_selector_component_1 = require("@coffeekraken/s-spaces-selector-component");
(0, s_spaces_selector_component_1.define)();
const SSpecsEditorWidget_1 = __importDefault(require("../SSpecsEditorWidget"));
class SSpecsEditorComponentSpacesWidget extends SSpecsEditorWidget_1.default {
    constructor(deps) {
        super(deps);
        if (!this.values.value && this.propObj.default) {
            this.setDefault(this.propObj.default);
        }
    }
    render() {
        var _a;
        const spaces = {
            padding: [],
            margin: [],
        };
        this.propObj.options.forEach((option) => {
            spaces.padding.push(Object.assign({}, option));
            spaces.margin.push(Object.assign({}, option));
        });
        return (0, lit_1.html) `
            <div
                class="${this.editor.utils.cls('_spaces-widget')}"
                @s-spaces-selector.change=${(e) => {
            this.setValue(e.detail);
        }}
            >
                ${this.renderLabel()}
                <s-spaces-selector
                    .spaces=${spaces}
                    .values=${Object.assign({}, (_a = this.values) !== null && _a !== void 0 ? _a : {})}
                ></s-spaces-selector>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentSpacesWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTJCO0FBRTNCLDJGQUF1RztBQUV2RyxJQUFBLG9DQUFnQyxHQUFFLENBQUM7QUFHbkMsK0VBQXlEO0FBRXpELE1BQXFCLGlDQUFrQyxTQUFRLDRCQUFvQjtJQUMvRSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQsTUFBTTs7UUFDRixNQUFNLE1BQU0sR0FBRztZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLG1CQUNaLE1BQU0sRUFDWCxDQUFDO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUNYLE1BQU0sRUFDWCxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUEsVUFBSSxFQUFBOzt5QkFFTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7NENBQ3BCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQzs7a0JBRUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7OEJBRU4sTUFBTTs4QkFDTixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLEVBQUUsQ0FBQzs7O1NBR3pELENBQUM7SUFDTixDQUFDO0NBQ0o7QUF2Q0Qsb0RBdUNDIn0=