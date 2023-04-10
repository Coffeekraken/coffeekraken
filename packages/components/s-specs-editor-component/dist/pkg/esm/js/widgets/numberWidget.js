import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
import { __isValidNumber } from '@coffeekraken/sugar/is';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentNumberWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        if (this.values.value === undefined) {
            this.values.value = this.propObj.default;
        }
    }
    validate(newValues) {
        let value = newValues.value;
        // letters in value
        if (this.propObj.required && !__isValidNumber(value)) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
        // letters in value
        if (`${parseFloat(value)}`.length !== value.length) {
            value = parseFloat(value);
        }
        // min
        if (this.propObj.min !== undefined && value < this.propObj.min) {
            return {
                error: __i18n(`The value must be greater or equal to %s`, {
                    id: 's-specs-editor.widget.number.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }
        // max
        if (this.propObj.max !== undefined && value > this.propObj.max) {
            return {
                error: __i18n(`The value must be lower or equal to %s`, {
                    id: 's-specs-editor.widget.number.max',
                    tokens: {
                        s: this.propObj.max,
                    },
                }),
            };
        }
    }
    render() {
        return html `
            <div class="${this.editor.utils.cls('_number-widget')}">
                ${this.renderLabel()}
                <input
                    @change=${(e) => {
            let value = parseFloat(e.target.value);
            this.setValue({
                value,
            });
        }}
                    type="number"
                    step="0.1"
                    min=${this.propObj.min}
                    max=${this.propObj.max}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_input', 's-input')}"
                    placeholder="${this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                    value="${this.values.value}"
                />
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd6RCxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsb0JBQW9CO0lBQy9FLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQVM7UUFDZCxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBRTVCLG1CQUFtQjtRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xELE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQywyQkFBMkIsRUFBRTtvQkFDdkMsRUFBRSxFQUFFLGdDQUFnQztpQkFDdkMsQ0FBQzthQUNMLENBQUM7U0FDTDtRQUVELG1CQUFtQjtRQUNuQixJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEQsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUVELE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDNUQsT0FBTztnQkFDSCxLQUFLLEVBQUUsTUFBTSxDQUFDLDBDQUEwQyxFQUFFO29CQUN0RCxFQUFFLEVBQUUsa0NBQWtDO29CQUN0QyxNQUFNLEVBQUU7d0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztxQkFDdEI7aUJBQ0osQ0FBQzthQUNMLENBQUM7U0FDTDtRQUVELE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDNUQsT0FBTztnQkFDSCxLQUFLLEVBQUUsTUFBTSxDQUFDLHdDQUF3QyxFQUFFO29CQUNwRCxFQUFFLEVBQUUsa0NBQWtDO29CQUN0QyxNQUFNLEVBQUU7d0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztxQkFDdEI7aUJBQ0osQ0FBQzthQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2tCQUMvQyxJQUFJLENBQUMsV0FBVyxFQUFFOzs4QkFFTixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFLO2FBQ1IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7OzBCQUdLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzswQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzRCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO21DQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7U0FHckMsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9