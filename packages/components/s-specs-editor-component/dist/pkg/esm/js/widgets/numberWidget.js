import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
import { __isValidNumber } from '@coffeekraken/sugar/is';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentNumberWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        if (this.values.value === undefined && this.propObj.default) {
            this.setValue(this.propObj.default);
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
        var _a;
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
                    placeholder="${(_a = this.propObj.default) !== null && _a !== void 0 ? _a : this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                    value="${this.values.value}"
                />
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd6RCxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsb0JBQW9CO0lBQy9FLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRVosSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTO1FBQ2QsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUU1QixtQkFBbUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsRCxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsMkJBQTJCLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxnQ0FBZ0M7aUJBQ3ZDLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hELEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzVELE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQywwQ0FBMEMsRUFBRTtvQkFDdEQsRUFBRSxFQUFFLGtDQUFrQztvQkFDdEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzVELE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQyx3Q0FBd0MsRUFBRTtvQkFDcEQsRUFBRSxFQUFFLGtDQUFrQztvQkFDdEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTTs7UUFDRixPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7a0JBQy9DLElBQUksQ0FBQyxXQUFXLEVBQUU7OzhCQUVOLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUs7YUFDUixDQUFDLENBQUM7UUFDUCxDQUFDOzs7MEJBR0ssSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzBCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7NEJBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7bUNBQ3BDLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs2QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7U0FHckMsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9