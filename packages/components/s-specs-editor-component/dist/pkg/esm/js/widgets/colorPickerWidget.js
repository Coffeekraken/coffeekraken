import { html } from 'lit';
import { __SColor } from '@specimen/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentColorPickerWidget extends __SSpecsEditorWidget {
    static isActive() {
        return true;
    }
    constructor(deps) {
        var _a, _b;
        super(deps);
        if (!this.values.value) {
            Object.assign(this.values, {
                format: (_a = this.propObj.format) !== null && _a !== void 0 ? _a : 'hexa',
                value: (_b = this.propObj.default) !== null && _b !== void 0 ? _b : '#ff0000ff',
            });
        }
    }
    render() {
        const color = new __SColor(this.propObj, this.values);
        return html `
            <div class="${this.editor.utils.cls('_color-picker-widget')}">
                <label
                    class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
                >
                    <s-color-picker
                        value="${color.toString()}"
                        format="${this.propObj.format}"
                        @s-color-picker.change=${(e) => {
            this.setValue(e.detail);
            this.editor.apply();
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
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2pELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQ0FBdUMsU0FBUSxvQkFBb0I7SUFDcEYsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxFQUFFLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLE1BQU07Z0JBQ3JDLEtBQUssRUFBRSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQ0FBSSxXQUFXO2FBQzdDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0RCxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7OzZCQUUxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzFCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztpQ0FHWSxLQUFLLENBQUMsUUFBUSxFQUFFO2tDQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtpREFDSixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7Ozs7OzBDQU1pQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Ozs7c0JBSTVDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1NBRzdELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==