import { html } from 'lit';

export default function (component) {
    return {
        keepOriginals: false,
        isActive() {
            return true;
        },
        html({ propObj, values, path }) {
            if (!values) {
                values = {};
            }
            return html`
                <div class="${component.utils.cls('_datetime-picker')}">
                    <label
                        class="${component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        <s-datetime-picker
                            value="${values.value ?? new Date().toISOString()}"
                            format="${values.format ?? 'YYYY-MM-DD'}"
                            @s-datetime-picker.change=${(e) => {
                                _console.log('e', e);

                                // component.setValue(path, {
                                //     ...values,
                                //     value: e.detail[
                                //         values.format ?? 'hexa'
                                //     ],
                                // });
                                // component.apply();
                            }}
                        >
                            <input
                                type="text"
                                name="datetime"
                                class="s-input"
                                placeholder="Choose a datetime"
                            />
                        </s-datetime-picker>
                        ${component._renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
