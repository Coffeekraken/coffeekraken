import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentSwitchWidget extends __SSpecsEditorWidget {
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
        return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFrQyxTQUFRLG9CQUFvQjtJQUMvRSxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLElBQTZCOztRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLEtBQUssQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2dDQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzs7a0NBRXhDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87YUFDMUIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDOztnQ0FFTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztnQ0FDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO21DQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxLQUFLO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUk7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUzs7c0JBRWpDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUMvQyxPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDOzs7U0FHYixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=