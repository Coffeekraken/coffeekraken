import { html } from 'lit';
import { __SColor } from '@specimen/types/utils';
export default class SSpecsEditorComponentColorPickerWidget {
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
                format: (_a = propObj.format) !== null && _a !== void 0 ? _a : 'hexa',
                value: (_b = propObj.default) !== null && _b !== void 0 ? _b : '#ff0000ff',
            };
        }
        const color = new __SColor(propObj, values);
        return html `
            <div class="${this._component.utils.cls('_color-picker-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    <s-color-picker
                        value="${color.toString()}"
                        format="${propObj.format}"
                        @s-color-picker.change=${(e) => {
            this._component.setValue(path, e.detail);
            this._component.apply();
        }}
                    >
                        <input
                            type="text"
                            name="color"
                            class="s-input"
                            placeholder=${propObj.placeholder}
                        />
                        <div class="_color-preview"></div>
                    </s-color-picker>
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0NBQXNDO0lBS3ZELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLEdBQWdCO2dCQUNsQixNQUFNLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxNQUFNO2dCQUNoQyxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxXQUFXO2FBQ3hDLENBQUM7U0FDTDtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1QyxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7OzZCQUU5QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztpQ0FHWSxLQUFLLENBQUMsUUFBUSxFQUFFO2tDQUNmLE9BQU8sQ0FBQyxNQUFNO2lEQUNDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3BCLElBQUksRUFDUyxDQUFDLENBQUMsTUFBTSxDQUN4QixDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7Ozs7MENBTWlCLE9BQU8sQ0FBQyxXQUFXOzs7O3NCQUl2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7U0FHdkQsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9