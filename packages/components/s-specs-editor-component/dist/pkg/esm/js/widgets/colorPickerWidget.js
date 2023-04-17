import { html } from 'lit';
import { __SColor } from '@specimen/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentColorPickerWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a, _b, _c, _d, _e;
        super(deps);
        if (!this.values.value) {
            this.setDefault({
                format: (_c = (_b = (_a = this.propObj.default) === null || _a === void 0 ? void 0 : _a.format) !== null && _b !== void 0 ? _b : this.propObj.format) !== null && _c !== void 0 ? _c : 'hexa',
                value: (_e = (_d = this.propObj.default) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : '#ff0000ff',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2pELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQ0FBdUMsU0FBUSxvQkFBb0I7SUFDcEYsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ1osTUFBTSxFQUNGLE1BQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTywwQ0FBRSxNQUFNLG1DQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sbUNBQ25CLE1BQU07Z0JBQ1YsS0FBSyxFQUFFLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sMENBQUUsS0FBSyxtQ0FBSSxXQUFXO2FBQ3BELENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0RCxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7a0JBQ3JELElBQUksQ0FBQyxXQUFXLEVBQUU7OzZCQUVQLEtBQUssQ0FBQyxRQUFRLEVBQUU7OEJBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzZDQUNKLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQzs7Ozs7O3NDQU1pQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Ozs7O1NBS3JELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==