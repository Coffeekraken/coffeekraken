"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const lit_1 = require("lit");
class SSpecsEditorComponentNumberWidget {
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
            html: (0, lit_1.html) `
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
                    this._error = (0, s_i18n_1.__i18n)(`Passed value "%s" is not a valid number`, {
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
                    this._warning = (0, s_i18n_1.__i18n)(`The value must be greater or equal to %s`, {
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
                    this._warning = (0, s_i18n_1.__i18n)('The value must be lower or equal to %s', {
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
exports.default = SSpecsEditorComponentNumberWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUkzQixNQUFxQixpQ0FBaUM7SUFPbEQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFhO2dCQUNmLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTzthQUN6QixDQUFDO1NBQ0w7UUFFRCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7OEJBQ1EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOztpQ0FFeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7c0NBR2EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFFM0IsbUJBQW1CO2dCQUNuQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2pDLENBQUMsQ0FBQyxN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