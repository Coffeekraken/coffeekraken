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
        return {
            error: this._error,
            warning: this._warning,
            html: html `
                <div
                    class="${this._component.utils.cls('_color-picker-widget')}"
                >
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
            `,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0NBQXNDO0lBT3ZELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLEdBQWdCO2dCQUNsQixNQUFNLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxNQUFNO2dCQUNoQyxLQUFLLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxXQUFXO2FBQ3hDLENBQUM7U0FDTDtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1QyxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFBOzs2QkFFTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7OztpQ0FHN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7cUNBR1ksS0FBSyxDQUFDLFFBQVEsRUFBRTtzQ0FDZixPQUFPLENBQUMsTUFBTTtxREFDQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxFQUNTLENBQUMsQ0FBQyxNQUFNLENBQ3hCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixDQUFDOzs7Ozs7OENBTWlCLE9BQU8sQ0FBQyxXQUFXOzs7OzBCQUl2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7YUFHdkQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=