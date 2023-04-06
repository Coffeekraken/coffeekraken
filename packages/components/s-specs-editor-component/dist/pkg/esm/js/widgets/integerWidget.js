import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
export default class SSpecsEditorComponentIntegerWidget {
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
        if (Number.isNaN(parseInt(value))) {
            return {
                error: __i18n(`Passed value "%s" is not a valid integer`, {
                    id: 's-specs-editor.widget.integer.invalid',
                    tokens: {
                        s: value,
                    },
                }),
            };
        }
        // letters in value
        if (`${parseInt(value)}`.length !== value.length) {
            value = parseInt(value);
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
            <div class="${this._component.utils.cls('_integer-widget')}">
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
                        step="1"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQWtDO0lBS25ELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTtRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBRUQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUV6QixtQkFBbUI7UUFDbkIsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQy9CLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQywwQ0FBMEMsRUFBRTtvQkFDdEQsRUFBRSxFQUFFLHVDQUF1QztvQkFDM0MsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxLQUFLO3FCQUNYO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQzlDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFFRCxNQUFNO1FBQ04sSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsRCxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsMENBQTBDLEVBQUU7b0JBQ3RELEVBQUUsRUFBRSxtQ0FBbUM7b0JBQ3ZDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ2pCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsRCxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMsd0NBQXdDLEVBQUU7b0JBQ3BELEVBQUUsRUFBRSxtQ0FBbUM7b0JBQ3ZDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ2pCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBYztnQkFDaEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2FBQ3pCLENBQUM7U0FDTDtRQUVELE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzs7NkJBRXpDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7O2tDQUdhLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQzNCLEtBQUs7YUFDUixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7Ozs4QkFHSyxPQUFPLENBQUMsR0FBRzs4QkFDWCxPQUFPLENBQUMsR0FBRztnQ0FDVCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLFNBQVMsQ0FDWjt1Q0FDYyxPQUFPLENBQUMsV0FBVztnQ0FDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7aUNBQ2IsTUFBTSxDQUFDLEtBQUs7O3NCQUV2QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7U0FHdkQsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9