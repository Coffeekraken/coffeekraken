import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
import { __SSelect } from '@specimen/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentSelectWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a;
        super(deps);
        if (!this.values.value) {
            this.setValue((_a = this.propObj.default) !== null && _a !== void 0 ? _a : {
                value: [],
            }, {
                validate: false,
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUdsRCxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsb0JBQW9CO0lBRy9FLFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUNULE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLG1DQUFJO2dCQUNwQixLQUFLLEVBQUUsRUFBRTthQUNaLEVBQ0Q7Z0JBQ0ksUUFBUSxFQUFFLEtBQUs7YUFDbEIsQ0FDSixDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNkLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRTFDLFdBQVc7UUFDWCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakQsT0FBTztnQkFDSCxLQUFLLEVBQUUsTUFBTSxDQUFDLDJCQUEyQixFQUFFO29CQUN2QyxFQUFFLEVBQUUsZ0NBQWdDO2lCQUN2QyxDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBRUQsTUFBTTtRQUNOLElB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