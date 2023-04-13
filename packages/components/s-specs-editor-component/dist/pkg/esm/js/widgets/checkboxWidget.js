import { html } from 'lit';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
import { __i18n } from '@coffeekraken/s-i18n';
import { __SCheckbox } from '@specimen/types/utils';
export default class SSpecsEditorComponentCheckboxWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            this.setValue((_a = this.propObj.default) !== null && _a !== void 0 ? _a : {
                value: [],
            });
        }
        this._checkbox = new __SCheckbox(this.propObj, this.values);
    }
    validate(newValues) {
        const itemsCount = Object.keys(newValues.value).length;
        // required
        if (this.propObj.required && this._checkbox.isEmpty()) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
        // min
        if (this.propObj.min !== undefined && itemsCount < this.propObj.min) {
            return {
                error: __i18n('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }
        // max
        if (this.propObj.max !== undefined && itemsCount > this.propObj.max) {
            return {
                error: __i18n('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.max',
                    tokens: {
                        '%s': this.propObj.max,
                    },
                }),
            };
        }
    }
    render() {
        return html `
            <div class="${this.editor.utils.cls('_checkbox-widget')}">
                ${this.renderLabel()}
                ${this.propObj.options.map((option, i) => {
            var _a;
            return html `
                        <label
                            class="${this.editor.utils.cls('_label', 's-label')}"
                        >
                            <span class="_option">${option.name}</span>
                            <input
                                type="checkbox"
                                @change=${(e) => {
                if (e.target.checked) {
                    this._checkbox.check(option);
                }
                else {
                    this._checkbox.uncheck(option);
                }
                this.setValue(this.values);
            }}
                                name="${this.path.at(-1)}"
                                class="${this.editor.utils.cls('_checkbox', 's-checkbox')}"
                                ?checked=${this._checkbox.isChecked(option)}
                                id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                .value=${option.value}
                            />
                        </label>
                    `;
        })}
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBELE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUNBQW9DLFNBQVEsb0JBQW9CO0lBR2pGLFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUNULE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUFJO2dCQUNwQixLQUFLLEVBQUUsRUFBRTthQUNaLENBQ0osQ0FBQztTQUNMO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQVM7UUFDZCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFdkQsV0FBVztRQUNYLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuRCxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsMkJBQTJCLEVBQUU7b0JBQ3ZDLEVBQUUsRUFBRSxnQ0FBZ0M7aUJBQ3ZDLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2pFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQyx5Q0FBeUMsRUFBRTtvQkFDckQsRUFBRSxFQUFFLG9DQUFvQztvQkFDeEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2pFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQyx3Q0FBd0MsRUFBRTtvQkFDcEQsRUFBRSxFQUFFLG9DQUFvQztvQkFDeEMsTUFBTSxFQUFFO3dCQUNKLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3pCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztrQkFDakQsSUFBSSxDQUFDLFdBQVcsRUFBRTtrQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN0QixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7WUFBQyxPQUFBLElBQUksQ0FBQTs7cUNBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMxQixRQUFRLEVBQ1IsU0FBUyxDQUNaOztvREFFdUIsTUFBTSxDQUFDLElBQUk7OzswQ0FHckIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2xDO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLENBQUM7d0NBQ08sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7eUNBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMxQixXQUFXLEVBQ1gsWUFBWSxDQUNmOzJDQUNVLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztzQ0FDckMsTUFBQSxNQUFNLENBQUMsRUFBRSxtQ0FBSSxVQUFVLENBQUMsRUFBRTt5Q0FDdkIsTUFBTSxDQUFDLEtBQUs7OztxQkFHaEMsQ0FBQTtTQUFBLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9