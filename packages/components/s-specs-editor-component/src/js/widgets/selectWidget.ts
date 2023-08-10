import { html } from 'lit';

import { __SSelect } from '@specim3n/types/utils';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget.js';
import __SSpecsEditorWidget from '../SSpecsEditorWidget.js';

export default class SSpecsEditorComponentSelectWidget extends __SSpecsEditorWidget {
    // specify if the final value has to be just the "value" data
    // and not an object with the "value" property
    static unwrapValue = true;

    _select: __SSelect;

    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        this._select = new __SSelect(
            {
                ...this.propObj,
                onSelect: (item) => {
                    this.setValue(item);
                },
            },
            this.values,
        );
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
        return html`
            <div class="${this.editor.utils.cls('_select-widget')}">
                ${this.renderLabel()}
                <select
                    @change=${(e) => {
                        for (let [
                            i,
                            option,
                        ] of this.propObj.options.entries()) {
                            for (let [j, $option] of [
                                ...e.target.options,
                            ].entries()) {
                                if (option.id !== $option.id) {
                                    continue;
                                }
                                if ($option.selected) {
                                    this._select.select(option.id);
                                } else {
                                    this._select.unselect(option.id);
                                }
                            }
                        }

                        // // apply changes
                        // this.setValue(this.values.value);
                    }}
                    name="${this.path.at(-1)}"
                    class="${this.editor.utils.cls(
                        '_select',
                        's-select',
                    )} ${!this.propObj.required &&
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
                        ? html`
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
                        return html`
                            <option
                                id="${option.id ?? `option-${i}`}"
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
