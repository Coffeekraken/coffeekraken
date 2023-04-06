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
    validate({ propObj, values }) {
        if (!values) {
            return;
        }
        const itemsCount = values.value.length;
        // min
        if (propObj.multiple &&
            propObj.min !== undefined &&
            itemsCount < propObj.min) {
            return {
                error: (0, s_i18n_1.__i18n)('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.select.min',
                    tokens: {
                        s: propObj.min,
                    },
                }),
            };
        }
        // max
        if (propObj.multiple &&
            propObj.max !== undefined &&
            itemsCount > propObj.max) {
            return {
                error: (0, s_i18n_1.__i18n)('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.select.max',
                    tokens: {
                        s: propObj.max,
                    },
                }),
            };
        }
    }
    render({ propObj, values, path }) {
        if (!(values === null || values === void 0 ? void 0 : values.value)) {
            values = {
                value: [],
            };
        }
        const select = new utils_1.__SSelect(propObj, values);
        return (0, lit_1.html) `
            <div class="${this._component.utils.cls('_select-widget')}">
                <label
                    class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                >
                    <select
                        @change=${(e) => {
            for (let [i, option] of propObj.options.entries()) {
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
        `;
    }
}
exports.default = SSpecsEditorComponentSelectWidget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThDO0FBQzlDLDZCQUEyQjtBQUUzQixpREFBa0Q7QUFJbEQsTUFBcUIsaUNBQWlDO0lBS2xELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFdkMsTUFBTTtRQUNOLElBQ0ksT0FBTyxDQUFDLFFBQVE7WUFDaEIsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTO1lBQ3pCLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUMxQjtZQUNFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLHlDQUF5QyxFQUFFO29CQUNyRCxFQUFFLEVBQUUsa0NBQWtDO29CQUN0QyxNQUFNLEVBQUU7d0JBQ0osQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHO3FCQUNqQjtpQkFDSixDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsTUFBTTtRQUNOLElBQ0ksT0FBTyxDQUFDLFFBQVE7WUFDaEIsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTO1lBQ3pCLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUMxQjtZQUNFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLElBQUEsZUFB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