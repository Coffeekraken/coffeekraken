import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';
export default class SSpecsEditorComponentHtmlWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        if (!this.values.value) {
            this.values.value = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxPQUFPLCtCQUFnQyxTQUFRLG9CQUFvQjtJQUM3RSxZQUFZLElBQTZCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsTUFBTTs7UUFDRixPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO2tCQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFOzs7OzhCQUlOLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDWixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOzRCQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzttQ0FDcEMsTUFBQSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQ0FDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLG1DQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztFQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7OztTQUdWLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==