"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_i18n_1 = require("@coffeekraken/s-i18n");
class SSpecsEditorComponentIntegerWidget {
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
                error: (0, s_i18n_1.__i18n)(`Passed value "%s" is not a valid integer`, {
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
                error: (0, s_i18n_1.__i18n)(`The value must be greater or equal to %s`, {
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
                error: (0, s_i18n_1.__i18n)(`The value must be lower or equal to %s`, {
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
        return (0, lit_1.html) `
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
exports.default = SSpecsEditorComponentIntegerWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBSTNCLGlEQUE4QztBQUU5QyxNQUFxQixrQ0FBa0M7SUFLbkQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRXpCLG1CQUFtQjtRQUNuQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDL0IsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsMENBQTBDLEVBQUU7b0JBQ3RELEVBQUUsRUFBRSx1Q0FBdUM7b0JBQzNDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsS0FBSztxQkFDWDtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUM5QyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO1FBRUQsTUFBTTtRQUNOLElBQUksT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbEQsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEIsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsMENBQTBDLEVBQUU7b0JBQ3RELEVBQUUsRUFBRSxtQ0FBbUM7b0JBQ3ZDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ2pCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsRCxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNwQixPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFBLGVBQU0sRUFBQyx3Q0FBd0MsRUFBRTtvQkFDcEQsRUFBRSxFQUFFLG1DQUFtQztvQkFDdkMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRztxQkFDakI7aUJBQ0osQ0FBQzthQUNMLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFjO2dCQUNoQixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU87YUFDekIsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFBLFVBQUksRUFBQTswQkFDTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7OzZCQUV6QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUix3QkFBd0IsQ0FDM0I7OztrQ0FHYSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUMzQixLQUFLO2FBQ1IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7OEJBR0ssT0FBTyxDQUFDLEdBQUc7OEJBQ1gsT0FBTyxDQUFDLEdBQUc7Z0NBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDVixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUixTQUFTLENBQ1o7dUNBQ2MsT0FBTyxDQUFDLFdBQVc7Z0NBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lDQUNiLE1BQU0sQ0FBQyxLQUFLOztzQkFFdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7O1NBR3ZELENBQUM7SUFDTixDQUFDO0NBQ0o7QUEzR0QscURBMkdDIn0=