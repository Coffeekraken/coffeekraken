"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
class SSpecsEditorComponentHtmlWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    render({ propObj, values, path }) {
        var _a, _b;
        if (!values) {
            values = {
                value: propObj.default,
            };
        }
        return (0, lit_1.html) `
            <div class="${this._component.utils.cls('_html-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    <textarea
                        rows="5"
                        @change=${(e) => this._component._update(path, propObj, e)}
                        name="${path.at(-1)}"
                        class="${this._component.utils.cls('_input', 's-input')}"
                        placeholder="${(_b = (_a = propObj.default) !== null && _a !== void 0 ? _a : propObj.title) !== null && _b !== void 0 ? _b : propObj.id}"
                        path="${path.join('.')}"
                    >
${values.value}</textarea
                    >
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
exports.default = SSpecsEditorComponentHtmlWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLE1BQXFCLCtCQUErQjtJQUtoRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFhO2dCQUNmLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTzthQUN6QixDQUFDO1NBQ0w7UUFFRCxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7OzZCQUV0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7Ozs7a0NBSWEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dDQUNyQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLFNBQVMsQ0FDWjt1Q0FDYyxNQUFBLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQzlCLE9BQU8sQ0FBQyxLQUFLLG1DQUNiLE9BQU8sQ0FBQyxFQUFFO2dDQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztFQUU1QyxNQUFNLENBQUMsS0FBSzs7c0JBRVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O1NBR3ZELENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuREQsa0RBbURDIn0=