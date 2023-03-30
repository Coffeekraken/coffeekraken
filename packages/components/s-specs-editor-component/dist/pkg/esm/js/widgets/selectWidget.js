import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
import { __SSelect } from '@specimen/types/utils';
export default function (component) {
    let error, warning;
    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!(values === null || values === void 0 ? void 0 : values.value)) {
                values = {
                    value: [],
                };
            }
            const select = new __SSelect(propObj, values);
            _console.log('sel', select.getSelected());
            return {
                error,
                warning,
                html: html `
                    <div class="${component.utils.cls('_select-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
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
                        error = __i18n('You must select at least %s item__(s)__', {
                            id: 's-specs-editor.widget.select.min',
                            tokens: {
                                s: propObj.min,
                            },
                        });
                        return component.requestUpdate();
                    }
                    // max
                    if (propObj.multiple &&
                        propObj.max !== undefined &&
                        itemsCount > propObj.max) {
                        error = __i18n('You must select at most %s item__(s)__', {
                            id: 's-specs-editor.widget.select.max',
                            tokens: {
                                s: propObj.max,
                            },
                        });
                        return component.requestUpdate();
                    }
                    warning = null;
                    error = null;
                    // apply changes
                    component.setValue(path, values);
                    component.apply();
                }}
                                name="${path.at(-1)}"
                                class="${component.utils.cls('_select', 's-select')}"
                                ?multiple=${propObj.multiple}
                                placeholder="${propObj.placeholder}"
                                path="${path.join('.')}"
                            >
                                ${propObj.options.map((option, i) => {
                    var _a;
                    return html `
                                        <option
                                            .value="${option.value}"
                                            value="${option.value}"
                                            id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                            ?selected=${select.isSelected(option.id)}
                                            .selected=${select.isSelected(option.id)}
                                        >
                                            ${option.name}
                                        </option>
                                    `;
                })}
                            </select>

                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUlsRCxNQUFNLENBQUMsT0FBTyxXQUFXLFNBQVM7SUFDOUIsSUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDO0lBRW5CLE9BQU87UUFDSCxRQUFRO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUEsRUFBRTtnQkFDaEIsTUFBTSxHQUFpQjtvQkFDbkIsS0FBSyxFQUFFLEVBQUU7aUJBQ1osQ0FBQzthQUNMO1lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBRTFDLE9BQU87Z0JBQ0gsS0FBSztnQkFDTCxPQUFPO2dCQUNQLElBQUksRUFBRSxJQUFJLENBQUE7a0NBQ1EsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7O3FDQUVsQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDeEIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7OzBDQUdhLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1osS0FBSyxJQUFJLENBQ0wsQ0FBQyxFQUNELE1BQU0sRUFDVCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FB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