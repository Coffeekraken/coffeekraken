import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';
import { __SSelect } from '@specimen/types/utils';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';
export default class SSpecsEditorComponentSelectWidget extends __SSpecsEditorWidget {
    constructor(deps) {
        var _a;
        super(deps);
        if (!((_a = this.values) === null || _a === void 0 ? void 0 : _a.value)) {
            this.values.value = [];
        }
    }
    validate(newValues) {
        const itemsCount = newValues.value.length;
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
        const select = new __SSelect(this.propObj, this.values);
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
                        select.select(option.id);
                    }
                    else {
                        select.unselect(option.id);
                    }
                }
            }
            // apply changes
            this.setValue(this.values);
        }}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls('_select', 's-select')}"
                    ?multiple=${this.propObj.multiple}
                    placeholder="${this.propObj.placeholder}"
                    path="${this.path.join('.')}"
                >
                    ${this.propObj.options.map((option, i) => {
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
            </div>
        `;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUdsRCxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsb0JBQW9CO0lBQy9FLFlBQVksSUFBNkI7O1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsS0FBSyxDQUFBLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFTO1FBQ2QsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFMUMsTUFBTTtRQUNOLElBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVM7WUFDOUIsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUMvQjtZQUNFLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLE1BQU0sQ0FBQyx5Q0FBeUMsRUFBRTtvQkFDckQsRUFBRSxFQUFFLGtDQUFrQztvQkFDdEMsTUFBTSxFQUFFO3dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7cUJBQ3RCO2lCQUNKLENBQUM7YUFDTCxDQUFDO1NBQ0w7UUFFRCxNQUFNO1FBQ04sSUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDckIsSUFBSSxDQUFD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