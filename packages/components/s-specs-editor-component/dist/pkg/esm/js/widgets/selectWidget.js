import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
import { __SSelect } from '@specim3n/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';
export default class SSpecsEditorComponentSelectWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        this._select = new __SSelect(this.propObj, this.values);
    }
    validate(newValues) {
        const itemsCount = newValues.value.length;
        // required
        if (this.propObj.required && this._select.isEmpty()) {
            return {
                error: __i18n(`This property is required`, {
                    id: 's-specs-editor.widget.required',
                }),
            };
        }
        // min
        if (this.propObj.multiple &&
            this.propObj.min !== undefined &&
            itemsCount < this.propObj.min) {
            return {
                error: __i18n('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.select.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }
        // max
        if (this.propObj.multiple &&
            this.propObj.max !== undefined &&
            itemsCount > this.propObj.max) {
            return {
                error: __i18n('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.select.max',
                    tokens: {
                        s: this.propObj.max,
                    },
                }),
            };
        }
    }
    render() {
        return html `
            <div class="${this.editor.utils.cls('_select-widget')}">
                ${this.renderLabel()}
                <select
                    @change=${(e) => {
            for (let [i, option,] of this.propObj.options.entries()) {
                for (let [j, $option] of [
                    ...e.target.options,
                ].entries()) {
                    if (option.id !== $option.id) {
                        continue;
                    }
                    if ($option.selected) {
                        this._select.select(option.id);
                    }
                    else {
                        this._select.unselect(option.id);
                    }
                }
            }
            // apply changes
            this.setValue(this.values);
        }}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_select', 's-select')} ${!this.propObj.required &&
            this._select.isEmpty() &&
            this.propObj.placeholder
            ? 'placeholder'
            : ''}"
                    ?multiple=${this.propObj.multiple}
                    placeholder="${this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                    ?required=${this.propObj.required}
                >
                    ${this.propObj.placeholder
            ? html `
                              <option
                                  value=""
                                  disabled
                                  ?selected=${this._select.isEmpty()}
                              >
                                  ${this.propObj.placeholder}
                              </option>
                          `
            : ''}
                    ${this.propObj.options.map((option, i) => {
            var _a;
            return html `
                            <option
                                id="${(_a = option.id) !== null && _a !== void 0 ? _a : `option-${i}`}"
                                ?selected=${this._select.isSelected(option.id)}
                                .selected=${this._select.isSelected(option.id)}
                            >
                                ${option.name}
                            </option>
                        `;
        })}
                </select>
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUdsRCxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsb0JBQW9CO0lBRy9FLFlBQVksSUFBNkI7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQVM7UUFDZCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUUxQyxXQUFXO1FBQ1gsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2pELE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQywyQkFBMkIsRUFBRTtvQkFDdkMsRUFBRSxFQUFFLGdDQUFnQztpQkFDdkMsQ0FBQzthQUNMLENBQUM7U0FDTDtRQUVELE1BQU07UUFDTixJQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTO1lBQzlCLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDL0I7WUFDRSxPQUFPO2dCQUNILEtBQUssRUFBRSxNQUFNLENBQUMseUNBQXlDLEVBQUU7b0JBQ3JELEVBQUUsRUFBRSxr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