import { html } from 'lit';

import type { ISSpecsEditorWidgetDeps } from '../SSpecsEditorWidget';
import __SSpecsEditorWidget from '../SSpecsEditorWidget';

import { __i18n } from '@coffeekraken/s-i18n';

import { __SCheckbox } from '@specimen/types/utils';

export default class SSpecsEditorComponentCheckboxWidget extends __SSpecsEditorWidget {
    constructor(deps: ISSpecsEditorWidgetDeps) {
        super(deps);

        if (!this.values.value) {
            this.values.value = [];
        }
    }

    validate(newValues) {
        _console.log('S', newValues);

        const itemsCount = Object.keys(newValues.value).length;

        // min
        if (this.propObj.min !== undefined && itemsCount < this.propObj.min) {
            return {
                error: __i18n('You must select at least %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.min',
                    tokens: {
                        s: this.propObj.min,
                    },
                }),
            };
        }

        // max
        if (this.propObj.max !== undefined && itemsCount > this.propObj.max) {
            return {
                error: __i18n('You must select at most %s item__(s)__', {
                    id: 's-specs-editor.widget.checkbox.max',
                    tokens: {
                        '%s': this.propObj.max,
                    },
                }),
            };
        }
    }

    render() {
        const checkbox = new __SCheckbox(this.propObj, this.values);

        return html`
            <div class="${this.editor.utils.cls('_checkbox-widget')}">
                ${this.renderLabel()}
                ${this.propObj.options.map(
                    (option, i) => html`
                        <label
                            class="${this.editor.utils.cls(
                                '_label',
                                's-label',
                            )}"
                        >
                            <span class="_option">${option.name}</span>
                            <input
                                type="checkbox"
                                @change=${(e) => {
                                    if (e.target.checked) {
                                        checkbox.check(option);
                                    } else {
                                        checkbox.uncheck(option);
                                    }
                                    this.setValue(this.values);
                                }}
                                name="${this.path.at(-1)}"
                                class="${this.editor.utils.cls(
                                    '_checkbox',
                                    's-checkbox',
                                )}"
                                ?checked=${checkbox.isChecked(option)}
                                id="${option.id ?? `option-${i}`}"
                                .value=${option.value}
                            />
                        </label>
                    `,
                )}
            </div>
        `;
    }
}
