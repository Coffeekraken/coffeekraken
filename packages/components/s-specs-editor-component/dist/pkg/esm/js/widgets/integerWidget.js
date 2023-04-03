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
                <div class="${this._component.utils.cls('_integer-widget')}">
                    <label
                        class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        <input
                            @change=${(e) => {
                let value = e.target.value;
                // letters in value
                if (Number.isNaN(parseInt(value))) {
                    e.target.value = 0;
                    this._error = __i18n(`Passed value "%s" is not a valid integer`, {
                        id: 's-specs-editor.widget.integer.invalid',
                        tokens: {
                            s: value,
                        },
                    });
                    return this._component.requestUpdate();
                }
                // letters in value
                if (`${parseInt(value)}`.length !== value.length) {
                    value = parseInt(value);
                    e.target.value = value;
                }
                // min
                if (propObj.min !== undefined &&
                    value < propObj.min) {
                    value = propObj.min;
                    e.target.value = value;
                    this._warning = __i18n(`The value must be greater or equal to %s`, {
                        id: 's-specs-editor.widget.integer.min',
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
                    this._warning = __i18n(`The value must be lower or equal to %s`, {
                        id: 's-specs-editor.widget.integer.max',
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
            `,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFJM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQWtDO0lBT25ELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBYztnQkFDaEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2FBQ3pCLENBQUM7U0FDTDtRQUVELE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUE7OEJBQ1EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDOztpQ0FFekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7c0NBR2EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFFM0IsbUJBQW1CO2dCQUNuQixJQUFJLE1B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