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
    render({ propObj, values, path }) {
        if (!values) {
            values = {
                value: propObj.default,
            };
        }
        return {
            error: this._error,
            warning: this._warning,
            html: html `
                <div class="${this._component.utils.cls('_number-widget')}">
                    <label
                        class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        <input
                            @change=${(e) => {
                let value = e.target.value;
                // letters in value
                if (Number.isNaN(parseFloat(value))) {
                    e.target.value = 0;
                    this._error = __i18n(`Passed value "%s" is not a valid number`, {
                        id: 's-specs-editor.widget.number.invalid',
                        tokens: {
                            s: value,
                        },
                    });
                    return this._component.requestUpdate();
                }
                // letters in value
                if (`${parseFloat(value)}`.length !==
                    value.length) {
                    value = parseFloat(value);
                    e.target.value = value;
                }
                // min
                if (propObj.min !== undefined &&
                    value < propObj.min) {
                    value = propObj.min;
                    e.target.value = value;
                    this._warning = __i18n(`The value must be greater or equal to %s`, {
                        id: 's-specs-editor.widget.number.min',
                        tokens: {
                            s: propObj.min,
                        },
                    });
                    return this._component.requestUpdate();
                }
                // max
                if (propObj.max !== undefined &&
                    value > propObj.max) {
                    value = propObj.max;
                    e.target.value = value;
                    this._warning = __i18n('The value must be lower or equal to %s', {
                        id: 's-specs-editor.widget.number.max',
                        tokens: {
                            s: propObj.max,
                        },
                    });
                    return this._component.requestUpdate();
                }
                this._error = null;
                this._warning = null;
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
            `,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBSTNCLE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWlDO0lBT2xELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBYTtnQkFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU87YUFDekIsQ0FBQztTQUNMO1FBRUQsT0FBTztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQTs4QkFDUSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7O2lDQUV4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztzQ0FHYSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNaLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUUzQixtQkFBbUI7Z0JBQ25CLElBQUksTUFB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