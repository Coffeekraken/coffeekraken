import { html } from 'lit';

import type { ISString } from '@specimen/types';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = <ISString>{
                    value: propObj.default,
                };
            }

            return {
                error,
                warning,
                html: html`
                    <div class="${component.utils.cls('_html-widget')}">
                        <label
                            class="${component.utils.cls(
                                '_label',
                                's-label s-label--block',
                            )}"
                        >
                            <textarea
                                rows="5"
                                @change=${(e) =>
                                    component._update(path, propObj, e)}
                                name="${path.at(-1)}"
                                class="${component.utils.cls(
                                    '_input',
                                    's-input',
                                )}"
                                placeholder="${propObj.default ??
                                propObj.title ??
                                propObj.id}"
                                path="${path.join('.')}"
                            >
${values.value}</textarea
                            >
                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
