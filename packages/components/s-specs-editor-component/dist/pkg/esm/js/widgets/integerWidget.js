import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
import { __isValidNumber } from '@coffeekraken/sugar/is';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentIntegerWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        if (this.values.value === undefined) {
            // this.values.value = this.propObj.default;
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
        if (`${parseInt(value)}`.length !== value.length) {
            value = parseInt(value);
        }
        // min
        if (this.propObj.min !== undefined && value < this.propObj.min) {
            value = this.propObj.min;
            return {
                error: __i18n(`The value must be greater or equal to %s`, {
                    id: 's-specs-editor.widget.integer.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }
        // max
        if (this.propObj.max !== undefined && value > this.propObj.max) {
            value = this.propObj.max;
            return {
                error: __i18n(`The value must be lower or equal to %s`, {
                    id: 's-specs-editor.widget.integer.max',
                    tokens: {
                        s: this.propObj.max,
                    },
                }),
            };
        }
    }
    render() {
        return html `
            <div class="${this.editor.utils.cls('_integer-widget')}">
                ${this.renderLabel()}
                <input
                    @change=${(e) => {
            let value = parseInt(e.target.value);
            this.setValue({
                value,
            });
        }}
                    type="number"
                    step="1"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd6RCxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQW1DLFNBQVEsb0JBQW9CO0lBQ2hGLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDakMsNENBQTRDO1NBQy9DO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTO1FBQ2QsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUU1QixtQkFBbUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsRCxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsMkJBQTJCLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxnQ0FBZ0M7aUJBQ3ZDLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzlDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzVELEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN6QixPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsMENBQTBDLEVBQUU7b0JBQ3RELEVBQUUsRUFBRSxtQ0FBbUM7b0JBQ3ZDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3FCQUN0QjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsTUFBTTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUM1RCxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDekIsT0FBTztnQkFDSCxLQUFLLEVBQUUsTUFBTSxDQUFDLHdDQUF3QyxFQUFFO29CQUNwRCxFQUFFLEVBQUUsbUNBQW1DO29CQUN2QyxNQUFNLEVBQUU7d0JBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztxQkFDdEI7aUJBQ0osQ0FBQzthQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2tCQUNoRCxJQUFJLENBQUMsV0FBVyxFQUFFOzs4QkFFTixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFLO2FBQ1IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7OzBCQUdLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzswQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzRCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO21DQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7U0FHckMsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9