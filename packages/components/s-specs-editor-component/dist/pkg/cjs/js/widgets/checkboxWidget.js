"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const s_i18n_1 = require("@coffeekraken/s-i18n");
const utils_1 = require("@specimen/types/utils");
class SSpecsEditorComponentCheckboxWidget {
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
                error: (0, s_i18n_1.__i18n)('You must select at least %s item__(s)__', {
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
                error: (0, s_i18n_1.__i18n)('You must select at most %s item__(s)__', {
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
        const checkbox = new utils_1.__SCheckbox(propObj, values);
        return (0, lit_1.html) `
            <div class="${this._component.utils.cls('_checkbox-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    ${this._component.renderLabel(propObj, path)}
                </label>
                ${propObj.options.map((option, i) => {
            var _a;
            return (0, lit_1.html) `
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
exports.default = SSpecsEditorComponentCheckboxWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLGlEQUE4QztBQUc5QyxpREFBb0Q7QUFFcEQsTUFBcUIsbUNBQW1DO0lBS3BELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTtRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXBELE1BQU07UUFDTixJQUFJLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3ZELE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLHlDQUF5QyxFQUFFO29CQUNyRCxFQUFFLEVBQUUsb0NBQW9DO29CQUN4QyxNQUFNLEVBQUU7d0JBQ0osQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHO3FCQUNqQjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsTUFBTTtRQUNOLElBQUksT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDdkQsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBQSxlQUFNLEVBQUMsd0NBQXdDLEVBQUU7b0JBQ3BELEVBQUUsRUFBRSxvQ0FBb0M7b0JBQ3hDLE1BQU0sRUFBRTt3QkFDSixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ3BCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBbUI7Z0JBQ3JCLEtBQUssRUFBRSxFQUFFO2FBQ1osQ0FBQztTQUNMO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVsRCxPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzs7NkJBRTFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7c0JBRUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs7a0JBRTlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNqQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7WUFBQyxPQUFBLElBQUEsVUFBSSxFQUFBOztxQ0FFRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUixTQUFTLENBQ1o7O29EQUV1QixNQUFNLENBQUMsSUFBSTs7OzBDQUdyQixDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNaLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ2xCLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzFCO3FCQUFNO29CQUNILFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzVCO2dCQUVELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixDQUFDO3dDQUNPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7eUNBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixXQUFXLEVBQ1gsWUFBWSxDQUNmOzJDQUNVLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO3NDQUMvQixNQUFBLE1BQU0sQ0FBQyxFQUFFLG1DQUFJLFVBQVUsQ0FBQyxFQUFFO3lDQUN2QixNQUFNLENBQUMsS0FBSzs7O3FCQUdoQyxDQUFBO1NBQUEsQ0FDSjs7U0FFUixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBdEdELHNEQXNHQyJ9