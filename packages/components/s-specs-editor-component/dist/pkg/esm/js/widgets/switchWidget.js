import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentSwitchWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a;
        super(deps);
        if (this.values.value === undefined) {
            this.setDefault((_a = this.propObj.default) !== null && _a !== void 0 ? _a : {
                value: false,
            });
        }
    }
    render() {
        return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFrQyxTQUFRLG9CQUFvQjtJQUMvRSxZQUFZLElBQTZCOztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUNYLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUFJO2dCQUNwQixLQUFLLEVBQUUsS0FBSzthQUNmLENBQ0osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7a0JBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDOzs4QkFFUixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2FBQzFCLENBQUMsQ0FBQztRQUNQLENBQUM7OzRCQUVPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDOzRCQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7K0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUs7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSTtZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTOzs7U0FHMUMsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9