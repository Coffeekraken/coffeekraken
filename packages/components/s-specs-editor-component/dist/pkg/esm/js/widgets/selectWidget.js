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
                error: __i18n('You must select at least %s item__(s)__', {
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
                error: __i18n('You must select at most %s item__(s)__', {
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
        const select = new __SSelect(propObj, values);
        return html `
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
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUlsRCxNQUFNLENBQUMsT0FBTyxPQUFPLGlDQUFpQztJQUtsRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU87U0FDVjtRQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRXZDLE1BQU07UUFDTixJQUNJLE9BQU8sQ0FBQyxRQUFRO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUztZQUN6QixVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFDMUI7WUFDRSxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMseUNBQXlDLEVBQUU7b0JBQ3JELEVBQUUsRUFBRSxrQ0FBa0M7b0JBQ3RDLE1BQU0sRUFBRTt3QkFDSixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUc7cUJBQ2pCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFDSSxPQUFPLENBQUMsUUFBUTtZQUNoQixP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