import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentHtmlWidget extends __SSpecsEditorWidget {
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
        return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxPQUFPLCtCQUFnQyxTQUFRLG9CQUFvQjtJQUM3RSxZQUFZLElBQTZCOztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FDVCxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQ0FBSTtnQkFDcEIsS0FBSyxFQUFFLEVBQUU7YUFDWixDQUNKLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNOztRQUNGLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7a0JBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUU7Ozs7OEJBSU4sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO21DQUNwQyxNQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssbUNBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O0VBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSzs7O1NBR1YsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9