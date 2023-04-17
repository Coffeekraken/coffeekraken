import { html } from 'lit';
import { __SDatetime } from '@specimen/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentDatetimePickerWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a, _b, _c, _d;
        super(deps);
        if (!this.values.value) {
            this.setDefault({
                format: (_c = (_b = (_a = this.propObj.default) === null || _a === void 0 ? void 0 : _a.format) !== null && _b !== void 0 ? _b : this.propObj.format) !== null && _c !== void 0 ? _c : 'YYYY-MM-DD',
                value: (_d = this.propObj.default) === null || _d === void 0 ? void 0 : _d.value,
            });
        }
    }
    render() {
        const datetime = new __SDatetime(this.propObj, this.values);
        return html `
            <div class="${this.editor.utils.cls('_datetime-picker-widget')}">
                ${this.renderLabel()}
                <s-datetime-picker
                    value="${this.values.value}"
                    ?calendar=${this.propObj.calendar}
                    format="${this.values.format}"
                    @s-datetime-picker.change=${(e) => {
            this.setValue(e.detail);
        }}
                    @s-datetime-picker.reset=${(e) => {
            this.setValue(e.detail);
        }}
                >
                    <input
                        type="text"
                        name="datetime"
                        class="s-input"
                        placeholder=${this.propObj.placeholder}
                    />
                </s-datetime-picker>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3BELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTyx5Q0FBMEMsU0FBUSxvQkFBb0I7SUFDdkYsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ1osTUFBTSxFQUNGLE1BQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTywwQ0FBRSxNQUFNLG1DQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sbUNBQ25CLFlBQVk7Z0JBQ2hCLEtBQUssRUFBRSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTywwQ0FBRSxLQUFLO2FBQ3JDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1RCxPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7a0JBQ3hELElBQUksQ0FBQyxXQUFXLEVBQUU7OzZCQUVQLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztnQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7OEJBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtnREFDQSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7K0NBQzBCLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7Ozs7O3NDQU1pQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Ozs7U0FJckQsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9