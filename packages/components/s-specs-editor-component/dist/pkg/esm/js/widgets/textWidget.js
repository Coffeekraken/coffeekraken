import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentTextWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        _console.log('RRR', this.values);
        if (!this.values.value) {
            this.values.value = this.propObj.default;
        }
    }
    validate(newValues) {
        _console.log('validate', newValues);
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
                />
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlDLE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sT0FBTywrQkFBZ0MsU0FBUSxvQkFBb0I7SUFDN0UsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTO1FBQ2QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUEsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQzVDLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQywyQkFBMkIsRUFBRTtvQkFDdkMsRUFBRSxFQUFFLGdDQUFnQztpQkFDdkMsQ0FBQzthQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztrQkFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRTs7OEJBRU4sQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSzthQUN4QixDQUFDLENBQUM7UUFDUCxDQUFDOzs0QkFFTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQzttQ0FDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXOzRCQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7NkJBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSzs7O1NBR3JDLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==