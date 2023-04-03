import { html } from 'lit';
import { __i18n } from '@coffeekraken/s-i18n';
import { __SCheckbox } from '@specimen/types/utils';
export default class SSpecsEditorComponentCheckboxWidget {
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
        const checkbox = new __SCheckbox(propObj, values);
        return {
            error: this._error,
            warning: this._warning,
            html: html `
                <div class="${this._component.utils.cls('_checkbox-widget')}">
                    <label
                        class="${this._component.utils.cls('_label', 's-label s-label--block')}"
                    >
                        ${this._component.renderLabel(propObj, path)}
                    </label>
                    ${propObj.options.map((option, i) => {
                var _a;
                return html `
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
                        this._error = __i18n('You must select at least %s item__(s)__', {
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
                        this._error = __i18n('You must select at most %s item__(s)__', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVwRCxNQUFNLENBQUMsT0FBTyxPQUFPLG1DQUFtQztJQU9wRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1FBQzVCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLEdBQW1CO2dCQUNyQixLQUFLLEVBQUUsRUFBRTthQUNaLENBQUM7U0FDTDtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVsRCxPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFBOzhCQUNRLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzs7aUNBRTFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUIsUUFBUSxFQUNSLHdCQUF3QixDQUMzQjs7MEJBRUMsSUFBSSxD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