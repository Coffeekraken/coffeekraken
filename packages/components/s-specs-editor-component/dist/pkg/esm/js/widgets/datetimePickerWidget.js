import { html } from 'lit';
import { __SDatetime } from '@specimen/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentDatetimePickerWidget extends __SSpecsEditorWidget {
    static isActive() {
        return true;
    }
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
                <label
                    class="${this.editor.utils.cls('_label', 's-label s-label--block')}"
                >
                    <s-datetime-picker
                        value="${this.values.value}"
                        ?calendar=${this.propObj.calendar}
                        format="${this.values.format}"
                        @s-datetime-picker.change=${(e) => {
            this.setValue(e.detail);
            this.editor.apply();
        }}
                        @s-datetime-picker.reset=${(e) => {
            this.setValue(e.detail);
            this.editor.apply();
        }}
                    >
                        <input
                            type="text"
                            name="datetime"
                            class="s-input"
                            placeholder=${this.propObj.placeholder}
                        />
                    </s-datetime-picker>
                    ${this.editor.renderLabel(this.propObj, this.path)}
                </label>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR3BELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTyx5Q0FBMEMsU0FBUSxvQkFBb0I7SUFDdkYsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDM0IsTUFBTSxFQUFFLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLFlBQVk7YUFDOUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVELE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzs7NkJBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDMUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7O2lDQUdZLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztvQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7a0NBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtvREFDQSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzttREFDMEIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLENBQUM7Ozs7OzswQ0FNaUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXOzs7c0JBRzVDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1NBRzdELENBQUM7SUFDTixDQUFDO0NBQ0oifQ==