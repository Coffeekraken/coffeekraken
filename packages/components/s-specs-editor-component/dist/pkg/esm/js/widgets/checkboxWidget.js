import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
export default function (component) {
    let error, warning;
    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = {
                    value: propObj.default && !Array.isArray(propObj.default)
                        ? [propObj.default]
                        : !propObj.default
                            ? []
                            : propObj.default,
                };
            }
            function getValueById(id) {
                for (let [i, valueObj] of values.value.entries()) {
                    if (valueObj.id === id) {
                        return valueObj;
                    }
                }
            }
            function addValue(option) {
                // value already in values
                if (getValueById(option.id)) {
                    return;
                }
                values.value.push(option);
            }
            function removeValue(option) {
                const valueObj = getValueById(option.id);
                // value not in values
                if (!valueObj) {
                    return;
                }
                values.value.splice(values.value.indexOf(valueObj), 1);
            }
            return {
                error,
                warning,
                html: html `
                    <div class="${component.utils.cls('_checkbox-widget')}">
                        <label
                            class="${component.utils.cls('_label', 's-label s-label--block')}"
                        >
                            ${component.renderLabel(propObj, path)}
                        </label>
                        ${propObj.options.map((option, i) => {
                    var _a;
                    return html `
                                <label
                                    class="${component.utils.cls('_label', 's-label')}"
                                >
                                    <span class="_option">${option.name}</span>
                                    <input
                                        type="checkbox"
                                        @change=${(e) => {
                        if (e.target.checked) {
                            addValue(option);
                        }
                        else {
                            removeValue(option);
                        }
                        const itemsCount = Object.keys(values.value).length;
                        // min
                        if (propObj.min !== undefined &&
                            itemsCount < propObj.min) {
                            error = __i18n('You must select at least %s item(s)', {
                                id: 's-specs-editor.widget.checkbox.min',
                                tokens: {
                                    '%s': propObj.min,
                                },
                            });
                            return component.requestUpdate();
                        }
                        // max
                        if (propObj.max !== undefined &&
                            itemsCount > propObj.max) {
                            error = __i18n('You must select at most %s item(s)', {
                                id: 's-specs-editor.widget.checkbox.max',
                                tokens: {
                                    '%s': propObj.max,
                                },
                            });
                            return component.requestUpdate();
                        }
                        warning = null;
                        error = null;
                        component.setValue(path, values);
                        component.apply();
                    }}
                                        name="${path.at(-1)}"
                                        class="${component.utils.cls('_checkbox', 's-checkbox')}"
                                        ?checked=${getValueById(option.id)}
                                        id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                        .value=${option.value}
                                    />
                                </label>
                            `;
                })}
                    </div>
                `,
            };
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSTlDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsU0FBUztJQUM5QixJQUFJLEtBQUssRUFBRSxPQUFPLENBQUM7SUFFbkIsT0FBTztRQUNILFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLEdBQWU7b0JBQ2pCLEtBQUssRUFDRCxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUM5QyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUNuQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTzs0QkFDbEIsQ0FBQyxDQUFDLEVBQUU7NEJBQ0osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPO2lCQUM1QixDQUFDO2FBQ0w7WUFFRCxTQUFTLFlBQVksQ0FBQyxFQUFFO2dCQUNwQixLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDcEIsT0FBTyxRQUFRLENBQUM7cUJBQ25CO2lCQUNKO1lBQ0wsQ0FBQztZQUNELFNBQVMsUUFBUSxDQUFDLE1BQU07Z0JBQ3BCLDBCQUEwQjtnQkFDMUIsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUN6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