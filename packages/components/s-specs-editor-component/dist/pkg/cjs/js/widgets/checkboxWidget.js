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
    render({ propObj, values, path }) {
        if (!values) {
            values = {
                value: [],
            };
        }
        const checkbox = new utils_1.__SCheckbox(propObj, values);
        return {
            error: this._error,
            warning: this._warning,
            html: (0, lit_1.html) `
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
                    const itemsCount = Object.keys(values.value).length;
                    // min
                    if (propObj.min !== undefined &&
                        itemsCount < propObj.min) {
                        this._error = (0, s_i18n_1.__i18n)('You must select at least %s item__(s)__', {
                            id: 's-specs-editor.widget.checkbox.min',
                            tokens: {
                                s: propObj.min,
                            },
                        });
                        return this._component.requestUpdate();
                    }
                    // max
                    if (propObj.max !== undefined &&
                        itemsCount > propObj.max) {
                        this._error = (0, s_i18n_1.__i18n)('You must select at most %s item__(s)__', {
                            id: 's-specs-editor.widget.checkbox.max',
                            tokens: {
                                '%s': propObj.max,
                            },
                        });
                        return this._component.requestUpdate();
                    }
                    this._warning = null;
                    this._error = null;
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
            `,
        };
    }
}
exports.default = SSpecsEditorComponentCheckboxWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBRTNCLGlEQUE4QztBQUc5QyxpREFBb0Q7QUFFcEQsTUFBcUIsbUNBQW1DO0lBT3BELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sR0FBbUI7Z0JBQ3JCLEtBQUssRUFBRSxFQUFFO2FBQ1osQ0FBQztTQUNMO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVsRCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7OEJBQ1EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDOztpQ0FFMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzswQkFFQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOztzQkFFOUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ2pCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFBQyxPQUFBLElBQUEsVUFBSSxFQUFBOzt5Q0FFRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlCLFFBQVEsRUFDUixTQUFTLENBQ1o7O3dEQUV1QixNQUFNLENBQUMsSUFBSTs7OzhDQUdyQixDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNaLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7d0JBQ2xCLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzFCO3lCQUFNO3dCQUNILFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzVCO29CQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQ2YsQ0FBQyxNQUFNLENBQUM7b0JBRVQsTUFBTTtvQkFDTixJQUNJLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUzt3QkFDekIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQzFCO3dCQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBQSxlQUFNLEVBQ2hCLHlDQUF5QyxFQUN6Qzs0QkFDSSxFQUFFLEVBQUUsb0NBQW9DOzRCQUN4QyxNQUFNLEVBQUU7Z0NBQ0osQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHOzZCQUNqQjt5QkFDSixDQUNKLENBQUM7d0JBQ0YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUMxQztvQkFFRCxNQUFNO29CQUNOLElBQ0ksT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTO3dCQUN6QixVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFDMUI7d0JBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLGVBQU0sRUFDaEIsd0NBQXdDLEVBQ3hDOzRCQUNJLEVBQUUsRUFBRSxvQ0FBb0M7NEJBQ3hDLE1BQU0sRUFBRTtnQ0FDSixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUc7NkJBQ3BCO3lCQUNKLENBQ0osQ0FBQzt3QkFDRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQzFDO29CQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFFbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM1QixDQUFDOzRDQUNPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NkNBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixXQUFXLEVBQ1gsWUFBWSxDQUNmOytDQUNVLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDOzBDQUMvQixNQUFBLE1BQU0sQ0FBQyxFQUFFLG1DQUFJLFVBQVUsQ0FBQyxFQUFFOzZDQUN2QixNQUFNLENBQUMsS0FBSzs7O3lCQUdoQyxDQUFBO2FBQUEsQ0FDSjs7YUFFUjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFySEQsc0RBcUhDIn0=