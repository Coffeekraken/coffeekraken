import { html } from 'lit';
import { __SColor } from '@specimen/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentColorPickerWidget extends __SSpecsEditorWidget {
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
                ${this.renderLabel()}
                <s-color-picker
                    value="${color.toString()}"
                    format="${this.propObj.format}"
                    @s-color-picker.change=${(e) => {
            this.setValue(e.detail);
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
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2pELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQ0FBdUMsU0FBUSxvQkFBb0I7SUFDcEYsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxFQUFFLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLE1BQU07Z0JBQ3JDLEtBQUssRUFBRSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQ0FBSSxXQUFXO2FBQzdDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0RCxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7a0JBQ3JELElBQUksQ0FBQyxXQUFXLEVBQUU7OzZCQUVQLEtBQUssQ0FBQyxRQUFRLEVBQUU7OEJBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzZDQUNKLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQzs7Ozs7O3NDQU1pQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Ozs7O1NBS3JELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==