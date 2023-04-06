import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
export default class SSpecsEditorComponentNumberWidget {
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
        let value = values.value;
        // letters in value
        if (Number.isNaN(parseFloat(value))) {
            return {
                error: __i18n(`Passed value "%s" is not a valid number`, {
                    id: 's-specs-editor.widget.number.invalid',
                    tokens: {
                        s: value,
                    },
                }),
            };
        }
        // letters in value
        if (`${parseFloat(value)}`.length !== value.length) {
            value = parseFloat(value);
        }
        // min
        if (propObj.min !== undefined && value < propObj.min) {
            value = propObj.min;
            return {
                error: __i18n(`The value must be greater or equal to %s`, {
                    id: 's-specs-editor.widget.integer.min',
                    tokens: {
                        s: propObj.min,
                    },
                }),
            };
        }
        // max
        if (propObj.max !== undefined && value > propObj.max) {
            value = propObj.max;
            return {
                error: __i18n(`The value must be lower or equal to %s`, {
                    id: 's-specs-editor.widget.integer.max',
                    tokens: {
                        s: propObj.max,
                    },
                }),
            };
        }
    }
    render({ propObj, values, path }) {
        if (!values) {
            values = {
                value: propObj.default,
            };
        }
        return html `
            <div class="${this._component.utils.cls('_number-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    <input
                        @change=${(e) => {
            let value = e.target.value;
            this._component.setValue(path, {
                value,
            });
            this._component.apply();
        }}
                        type="number"
                        step="0.1"
                        min=${propObj.min}
                        max=${propObj.max}
                        name="${path.at(-1)}"
                        class="${this._component.utils.cls('_input', 's-input')}"
                        placeholder="${propObj.placeholder}"
                        path="${path.join('.')}"
                        value="${values.value}"
                    />
                    ${this._component.renderLabel(propObj, path)}
                </label>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBSTNCLE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWlDO0lBS2xELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTtRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBRUQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUV6QixtQkFBbUI7UUFDbkIsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQyx5Q0FBeUMsRUFBRTtvQkFDckQsRUFBRSxFQUFFLHNDQUFzQztvQkFDMUMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxLQUFLO3FCQUNYO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hELEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFFRCxNQUFNO1FBQ04sSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsRCxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsMENBQTBDLEVBQUU7b0JBQ3RELEVBQUUsRUFBRSxtQ0FBbUM7b0JBQ3ZDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ2pCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsRCxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsd0NBQXdDLEVBQUU7b0JBQ3BELEVBQUUsRUFBRSxtQ0FBbUM7b0JBQ3ZDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ2pCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBYTtnQkFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU87YUFDekIsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOzs2QkFFeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7a0NBR2EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNaLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDM0IsS0FBSzthQUNSLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQzs7OzhCQUdLLE9BQU8sQ0FBQyxHQUFHOzhCQUNYLE9BQU8sQ0FBQyxHQUFHO2dDQUNULElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUNBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1IsU0FBUyxDQUNaO3VDQUNjLE9BQU8sQ0FBQyxXQUFXO2dDQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQ0FDYixNQUFNLENBQUMsS0FBSzs7c0JBRXZCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7OztTQUd2RCxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=