import type { __ISDatetime } from '@coffeekraken/sugar';
import { html } from 'lit';

export default function (component) {
    let error, warning;

    return {
        isActive() {
            return true;
        },
        render({ propObj, values, path }) {
            if (!values) {
                values = {};
            }
            return {
                error,
                warning,
                html: html`
                    <div
                        class="${component.utils.cls(
                            '_datetime-picker-widget',
                        )}"
                    >
                        <label
                            class="${component.utils.cls(
                                '_label',
                                's-label s-label--block',
                            )}"
                        >
                            <s-datetime-picker
                                value="${values.value ??
                                propObj.default ??
                                new Date().toISOString()}"
                                ?calendar=${propObj.calendar}
                                format="${values.format ??
                                propObj.format ??
                                'YYYY-MM-DD'}"
                                @s-datetime-picker.change=${(e) => {
                                    component.setValue(
                                        path,
                                        <__ISDatetime>e.detail,
                                    );
                                    component.apply();
                                }}
                                @s-datetime-picker.reset=${(e) => {
                                    component.setValue(
                                        path,
                                        <__ISDatetime>e.detail,
                                    );
                                    component.apply();
                                }}
                            >
                                <input
                                    type="text"
                                    name="datetime"
                                    class="s-input"
                                    placeholder=${propObj.placeholder}
                                />
                            </s-datetime-picker>
                            ${component.renderLabel(propObj, path)}
                        </label>
                    </div>
                `,
            };
        },
    };
}
