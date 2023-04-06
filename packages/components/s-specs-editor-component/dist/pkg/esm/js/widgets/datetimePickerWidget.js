import { html } from 'lit';
import { __SDatetime } from '@specimen/types/utils';
export default class SSpecsEditorComponentDatetimePickerWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    render({ propObj, values, path }) {
        var _a;
        if (!values) {
            values = {
                value: propObj.default,
                format: (_a = propObj.format) !== null && _a !== void 0 ? _a : 'YYYY-MM-DD',
            };
        }
        const datetime = new __SDatetime(propObj, values);
        return html `
            <div
                class="${this._component.utils.cls('_datetime-picker-widget')}"
            >
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    <s-datetime-picker
                        value="${values.value}"
                        ?calendar=${propObj.calendar}
                        format="${values.format}"
                        @s-datetime-picker.change=${(e) => {
            this._component.setValue(path, e.detail);
            this._component.apply();
        }}
                        @s-datetime-picker.reset=${(e) => {
            this._component.setValue(path, e.detail);
            this._component.apply();
        }}
                    >
                        <input
                            type="text"
                            name="datetime"
                            class="s-input"
                            placeholder=${propObj.placeholder}
                        />
                    </s-datetime-picker>
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBSXBELE1BQU0sQ0FBQyxPQUFPLE9BQU8seUNBQXlDO0lBSzFELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLEdBQW1CO2dCQUNyQixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU87Z0JBQ3RCLE1BQU0sRUFBRSxNQUFBLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLFlBQVk7YUFDekMsQ0FBQztTQUNMO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBSSxDQUFBOzt5QkFFTSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7Ozs2QkFHaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7aUNBR1ksTUFBTSxDQUFDLEtBQUs7b0NBQ1QsT0FBTyxDQUFDLFFBQVE7a0NBQ2xCLE1BQU0sQ0FBQyxNQUFNO29EQUNLLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3BCLElBQUksRUFDVSxDQUFDLENBQUMsTUFBTSxDQUN6QixDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDO21EQUMwQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUNwQixJQUFJLEVBQ1UsQ0FBQyxDQUFDLE1BQU0sQ0FDekIsQ0FBQztZQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQzs7Ozs7OzBDQU1pQixPQUFPLENBQUMsV0FBVzs7O3NCQUd2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7U0FHdkQsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9