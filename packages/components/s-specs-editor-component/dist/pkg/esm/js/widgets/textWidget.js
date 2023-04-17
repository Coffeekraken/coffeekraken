import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentTextWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            this.setDefault((_a = this.propObj.default) !== null && _a !== void 0 ? _a : {
                value: '',
            });
        }
    }
    validate(newValues) {
        if (this.propObj.required && !(newValues === null || newValues === void 0 ? void 0 : newValues.value)) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
    }
    render() {
        return html `
            <div class="${this.editor.utils.cls('_text-widget')}">
                ${this.renderLabel()}
                <input
                    @change=${(e) => {
            this.setValue({
                value: e.target.value,
            });
        }}
                    type="text"
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${this.propObj.pladeholder}"
                    path="${this.path.join('.')}"
                    value="${this.values.value}"
                    .value=${this.values.value}
                />
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlDLE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTywrQkFBZ0MsU0FBUSxvQkFBb0I7SUFDN0UsWUFBWSxJQUE2Qjs7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQ1gsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sbUNBQUk7Z0JBQ3BCLEtBQUssRUFBRSxFQUFFO2FBQ1osQ0FDSixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQVM7UUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsS0FBSyxDQUFBLEVBQUU7WUFDNUMsT0FBTztnQkFDSCxLQUFLLEVBQUUsTUFBTSxDQUFDLDJCQUEyQixFQUFFO29CQUN2QyxFQUFFLEVBQUUsZ0NBQWdDO2lCQUN2QyxDQUFDO2FBQ0wsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO2tCQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFOzs4QkFFTixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2FBQ3hCLENBQUMsQ0FBQztRQUNQLENBQUM7OzRCQUVPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO21DQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzZCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7OztTQUdyQyxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=