import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
import { __SCheckbox } from '@specimen/types/utils';
export default class SSpecsEditorComponentCheckboxWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    validate({ values, propObj }) {
        if (!values) {
            return;
        }
        const itemsCount = Object.keys(values.value).length;
        // min
        if (propObj.min !== undefined && itemsCount < propObj.min) {
            return {
                error: __i18n('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.min',
                    tokens: {
                        s: propObj.min,
                    },
                }),
            };
        }
        // max
        if (propObj.max !== undefined && itemsCount > propObj.max) {
            return {
                error: __i18n('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.max',
                    tokens: {
                        '%s': propObj.max,
                    },
                }),
            };
        }
    }
    render({ propObj, values, path }) {
        if (!values) {
            values = {
                value: [],
            };
        }
        const checkbox = new __SCheckbox(propObj, values);
        return html `
            <div class="${this._component.utils.cls('_checkbox-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    ${this._component.renderLabel(propObj, path)}
                </label>
                ${propObj.options.map((option, i) => {
            var _a;
            return html `
                        <label
                            class="${this._component.utils.cls('_label', 's-label')}"
                        >
                            <span class="_option">${option.name}</span>
                            <input
                                type="checkbox"
                                @change=${(e) => {
                if (e.target.checked) {
                    checkbox.check(option);
                }
                else {
                    checkbox.uncheck(option);
                }
                this._component.setValue(path, values);
                this._component.apply();
            }}
                                name="${path.at(-1)}"
                                class="${this._component.utils.cls('_checkbox', 's-checkbox')}"
                                ?checked=${checkbox.isChecked(option)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVwRCxNQUFNLENBQUMsT0FBTyxPQUFPLG1DQUFtQztJQUtwRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUU7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87U0FDVjtRQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUVwRCxNQUFNO1FBQ04sSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUN2RCxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMseUNBQXlDLEVBQUU7b0JBQ3JELEVBQUUsRUFBRSxvQ0FBb0M7b0JBQ3hDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ2pCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUN2RCxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsd0NBQXdDLEVBQUU7b0JBQ3BELEVBQUUsRUFBRSxvQ0FBb0M7b0JBQ3hDLE1BQU0sRUFBRTt3QkFDSixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ3BCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBbUI7Z0JBQ3JCLEtBQUssRUFBRSxFQUFFO2FBQ1osQ0FBQztTQUNMO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzs7NkJBRTFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7c0JBRUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7a0JBRTlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNqQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7WUFBQyxPQUFBLElBQUksQ0FBQTs7cUNBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1IsU0FBUyxDQUNaOztvREFFdUIsTUFBTSxDQUFDLElBQUk7OzswQ0FHckIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUNsQixRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxQjtxQkFBTTtvQkFDSCxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM1QjtnQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsQ0FBQzt3Q0FDTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lDQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsV0FBVyxFQUNYLFlBQVksQ0FDZjsyQ0FDVSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztzQ0FDL0IsTUFBQSxNQUFNLENBQUMsRUFBRSxtQ0FBSSxVQUFVLENBQUMsRUFBRTt5Q0FDdkIsTUFBTSxDQUFDLEtBQUs7OztxQkFHaEMsQ0FBQTtTQUFBLENBQ0o7O1NBRVIsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9