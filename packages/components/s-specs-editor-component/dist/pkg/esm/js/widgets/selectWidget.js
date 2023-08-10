import { html } from 'lit';
import { __SSelect } from '@specim3n/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';
export default class SSpecsEditorComponentSelectWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        super(deps);
        this._select = new __SSelect(Object.assign(Object.assign({}, this.propObj), { onSelect: (item) => {
                this.setValue(item);
            } }), this.values);
    }
    // validate(newValues) {
    //     const itemsCount = newValues.value.length;
    //     // required
    //     if (this.propObj.required && this._select.isEmpty()) {
    //         return {
    //             error: __i18n(`This property is required`, {
    //                 id: 's-specs-editor.widget.required',
    //             }),
    //         };
    //     }
    //     // min
    //     if (
    //         this.propObj.multiple &&
    //         this.propObj.min !== undefined &&
    //         itemsCount < this.propObj.min
    //     ) {
    //         return {
    //             error: __i18n('You must select at least %s item__(s)__', {
    //                 id: 's-specs-editor.widget.select.min',
    //                 tokens: {
    //                     s: this.propObj.min,
    //                 },
    //             }),
    //         };
    //     }
    //     // max
    //     if (
    //         this.propObj.multiple &&
    //         this.propObj.max !== undefined &&
    //         itemsCount > this.propObj.max
    //     ) {
    //         return {
    //             error: __i18n('You must select at most %s item__(s)__', {
    //                 id: 's-specs-editor.widget.select.max',
    //                 tokens: {
    //                     s: this.propObj.max,
    //                 },
    //             }),
    //         };
    //     }
    // }
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
            // // apply changes
            // this.setValue(this.values.value);
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
// specify if the final value has to be just the "value" data
// and not an object with the "value" property
SSpecsEditorComponentSelectWidget.unwrapValue = true;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2xELE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQ0FBa0MsU0FBUSxvQkFBb0I7SUFPL0UsWUFBWSxJQUE2QjtRQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxpQ0FFakIsSUFBSSxDQUFDLE9BQU8sS0FDZixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsS0FFTCxJQUFJLENBQUMsTUFBTSxDQUNkLENBQUM7SUFDTixDQUFDO0lBRUQsd0JBQXdCO0lBQ3hCLGlEQUFpRDtJQUVqRCxrQkFBa0I7SUFDbEIsNkRBQTZEO0lBQzdELG1CQUFtQjtJQUNuQiwyREFBMkQ7SUFDM0Qsd0RBQXdEO0lBQ3hELGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsUUFBUTtJQUVSLGFBQWE7SUFDYixXQUFXO0lBQ1gsbUNBQW1DO0lBQ25DLDRDQUE0QztJQUM1Qyx3Q0FBd0M7SUFDeEMsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQix5RUFBeUU7SUFDekUsMERBQTBEO0lBQzFELDRCQUE0QjtJQUM1QiwyQ0FBMkM7SUFDM0MscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsUUFBUTtJQUVSLGFBQWE7SUFDYixXQUFXO0lBQ1gsbUNBQW1DO0lBQ25DLDRDQUE0QztJQUM1Qyx3Q0FBd0M7SUFDeEMsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQix3RUFBd0U7SUFDeEUsMERBQTBEO0lBQzFELDRCQUE0QjtJQUM1QiwyQ0FBMkM7SUFDM0MscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsUUFBUTtJQUNSLElBQUk7SUFFSixNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2tCQUMvQyxJQUFJLENBQUMsV0FBVyxFQUFFOzs4QkFFTixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osS0FBSyxJQUFJLENBQ0wsQ0FBQyxFQUNELE1BQU0sRUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNqQyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ3JCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2lCQUN0QixDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUNULElBQUksTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFFO3dCQUMxQixTQUFTO3FCQUNaO29CQUNELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTt3QkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNsQzt5QkFBTTt3QkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ3BDO2lCQUNKO2FBQ0o7WUFFRCxtQkFBbUI7WUFDbkIsb0NBQW9DO1FBQ3hDLENBQUM7NEJBQ08sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMxQixTQUFTLEVBQ1QsVUFBVSxDQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ3BCLENBQUMsQ0FBQyxhQUFhO1lBQ2YsQ0FBQyxDQUFDLEVBQUU7Z0NBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO21DQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7NEJBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FDZixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7O3NCQUUvQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozs4Q0FJZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7O29DQUVoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7OzJCQUVqQztZQUNILENBQUMsQ0FBQyxFQUFFO3NCQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7WUFDckMsT0FBTyxJQUFJLENBQUE7O3NDQUVHLE1BQUEsTUFBTSxDQUFDLEVBQUUsbUNBQUksVUFBVSxDQUFDLEVBQUU7NENBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7NENBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7O2tDQUU1QyxNQUFNLENBQUMsSUFBSTs7eUJBRXBCLENBQUM7UUFDTixDQUFDLENBQUM7OztTQUdiLENBQUM7SUFDTixDQUFDOztBQW5JRCw2REFBNkQ7QUFDN0QsOENBQThDO0FBQ3ZDLDZDQUFXLEdBQUcsSUFBSSxDQUFDIn0=