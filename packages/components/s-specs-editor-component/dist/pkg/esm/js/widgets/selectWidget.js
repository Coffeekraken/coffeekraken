import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
import { __SSelect } from '@specimen/types/utils';
export default class SSpecsEditorComponentSelectWidget {
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
        const select = new __SSelect(propObj, values);
        return {
            error: this._error,
            warning: this._warning,
            html: html `
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
                    this._error = __i18n('You must select at least %s item__(s)__', {
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
                    this._error = __i18n('You must select at most %s item__(s)__', {
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
                return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUlsRCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFpQztJQU9sRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1FBQzVCLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUEsRUFBRTtZQUNoQixNQUFNLEdBQWlCO2dCQUNuQixLQUFLLEVBQUUsRUFBRTthQUNaLENBQUM7U0FDTDtRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU5QyxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFBOzhCQUNRLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzs7aUNBRXhDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcs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