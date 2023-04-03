import { __i18n } from '@coffeekraken/s-i18n';
import { html } from 'lit';

import { __SSelect } from '@specimen/types/utils';

import type { ISSelectData } from '@specimen/types';

export default class SSpecsEditorComponentSelectWidget {
    _error;
    _warning;
    _component;
    _propObj;
    _path;

    static isActive() {
        return true;
    }

    constructor({ component, propObj, path }) {
        this._component = component;
        this._propObj = propObj;
        this._path = path;
    }

    render({ propObj, values, path }) {
        if (!values?.value) {
            values = <ISSelectData>{
                value: [],
            };
        }

        const select = new __SSelect(propObj, values);

        return {
            error: this._error,
            warning: this._warning,
            html: html`
                <div class="${this._component.utils.cls('_select-widget')}">
                    <label
                        class="${this._component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        <select
                            @change=${(e) => {
                                for (let [
                                    i,
                                    option,
                                ] of propObj.options.entries()) {
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

                                const itemsCount = values.value.length;

                                // min
                                if (
                                    propObj.multiple &&
                                    propObj.min !== undefined &&
                                    itemsCount < propObj.min
                                ) {
                                    this._error = __i18n(
                                        'You must select at least %s item__(s)__',
                                        {
                                            id: 's-specs-editor.widget.select.min',
                                            tokens: {
                                                s: propObj.min,
                                            },
                                        },
                                    );
                                    return this._component.requestUpdate();
                                }

                                // max
                                if (
                                    propObj.multiple &&
                                    propObj.max !== undefined &&
                                    itemsCount > propObj.max
                                ) {
                                    this._error = __i18n(
                                        'You must select at most %s item__(s)__',
                                        {
                                            id: 's-specs-editor.widget.select.max',
                                            tokens: {
                                                s: propObj.max,
                                            },
                                        },
                                    );
                                    return this._component.requestUpdate();
                                }

                                this._warning = null;
                                this._error = null;

                                // apply changes
                                this._component.setValue(path, values);
                                this._component.apply();
                            }}
                            name="${path.at(-1)}"
                            class="${this._component.utils.cls(
                                '_select',
                                's-select',
                            )}"
                            ?multiple=${propObj.multiple}
                            placeholder="${propObj.placeholder}"
                            path="${path.join('.')}"
                        >
                            ${propObj.options.map(
                                (option, i) => html`
                                    <option
                                        id="${option.id ?? `option-${i}`}"
                                        ?selected=${select.isSelected(
                                            option.id,
                                        )}
                                        .selected=${select.isSelected(
                                            option.id,
                                        )}
                                    >
                                        ${option.name}
                                    </option>
                                `,
                            )}
                        </select>

                        ${this._component.renderLabel(propObj, path)}
                    </label>
                </div>
            `,
        };
    }
}
