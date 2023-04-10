import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';

import { __SSelect } from '@specimen/types/utils';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

export default class SSpecsEditorComponentSelectWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);
        if (!this.values?.value) {
            this.values.value = [];
        }
    }

    validate(newValues) {
        const itemsCount = newValues.value.length;

        // min
        if (
            this.propObj.multiple &&
            this.propObj.min !== undefined &&
            itemsCount < this.propObj.min
        ) {
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
        if (
            this.propObj.multiple &&
            this.propObj.max !== undefined &&
            itemsCount > this.propObj.max
        ) {
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
                                    select.select(option.id);
                                } else {
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
                    ${this.propObj.options.map(
                        (option, i) => html`
                            <option
                                id="${option.id ?? `option-${i}`}"
                                ?selected=${select.isSelected(option.id)}
                                .selected=${select.isSelected(option.id)}
                            >
                                ${option.name}
                            </option>
                        `,
                    )}
                </select>
            </div>
        `;
    }
}
