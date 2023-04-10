import { html } from 'lit';
import { __SDatetime } from '@specimen/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentDatetimePickerWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            Object.assign(this.values, {
                value: this.propObj.default,
                format: (_a = this.propObj.format) !== null && _a !== void 0 ? _a : 'YYYY-MM-DD',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3BELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTyx5Q0FBMEMsU0FBUSxvQkFBb0I7SUFDdkYsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDM0IsTUFBTSxFQUFFLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLFlBQVk7YUFDOUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVELE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztrQkFDeEQsSUFBSSxDQUFDLFdBQVcsRUFBRTs7NkJBRVAsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dDQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTs4QkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dEQUNBLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQzsrQ0FDMEIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7Ozs7c0NBTWlCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVzs7OztTQUlyRCxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=