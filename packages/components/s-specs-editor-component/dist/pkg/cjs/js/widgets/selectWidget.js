"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const lit_1 = require("lit");
const utils_1 = require("@specimen/types/utils");
class SSpecsEditorComponentSelectWidget {
    static isActive() {
        return true;
    }
    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }
    render({ propObj, values, path }) {
        if (!(values === null || values === void 0 ? void 0 : values.value)) {
            values = {
                value: [],
            };
        }
        const select = new utils_1.__SSelect(propObj, values);
        return {
            error: this._error,
            warning: this._warning,
            html: (0, lit_1.html) `
                <div class="${this._component.utils.cls('_select-widget')}">
                    <label
                        class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        <select
                            @change=${(e) => {
                for (let [i, option,] of propObj.options.entries()) {
                    for (let [j, $option] of [
                        ...e.target.options,
                    ].entries()) {
                        if (option.id !== $option.id) {
                            continue;
                        }
                        if ($option.selected) {
                            select.select(option.id);
                        }
                        else {
                            select.unselect(option.id);
                        }
                    }
                }
                const itemsCount = values.value.length;
                // min
                if (propObj.multiple &&
                    propObj.min !== undefined &&
                    itemsCount < propObj.min) {
                    this._error = (0, s_i18n_1.__i18n)('You must select at least %s item__(s)__', {
                        id: 's-specs-editor.widget.select.min',
                        tokens: {
                            s: propObj.min,
                        },
                    });
                    return this._component.requestUpdate();
                }
                // max
                if (propObj.multiple &&
                    propObj.max !== undefined &&
                    itemsCount > propObj.max) {
                    this._error = (0, s_i18n_1.__i18n)('You must select at most %s item__(s)__', {
                        id: 's-specs-editor.widget.select.max',
                        tokens: {
                            s: propObj.max,
                        },
                    });
                    return this._component.requestUpdate();
                }
                this._warning = null;
                this._error = null;
                // apply changes
                this._component.setValue(path, values);
                this._component.apply();
            }}
                            name="${path.at(-1)}"
                            class="${this._component.utils.cls('_select', 's-select')}"
                            ?multiple=${propObj.multiple}
                            placeholder="${propObj.placeholder}"
                            path="${path.join('.')}"
                        >
                            ${propObj.options.map((option, i) => {
                var _a;
                return (0, lit_1.html) `
                                    <option
                                        id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                        ?selected=${select.isSelected(option.id)}
                                        .selected=${select.isSelected(option.id)}
                                    >
                                        ${option.name}
                                    </option>
                                `;
            })}
                        </select>

                        ${this._component.renderLabel(propObj, path)}
                    </label>
                </div>
            `,
        };
    }
}
exports.default = SSpecsEditorComponentSelectWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUUzQixpREFBa0Q7QUFJbEQsTUFBcUIsaUNBQWlDO0lBT2xELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7UUFDNUIsSUFBSSxDQUFDLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQ2hCLE1BQU0sR0FBaUI7Z0JBQ25CLEtBQUssRUFBRSxFQUFFO2FBQ1osQ0FBQztTQUNMO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU5QyxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBQSxVQUFJLEVBQUE7OEJBQ1EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDOztpQ0FFeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QixRQUFRLEVBQ1Isd0JBQXdCLENBQzNCOzs7c0NBR2EsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDWixLQUFLLElBQUksQ0FDTCxDQUFDLEVBQ0QsTUFBTSxF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