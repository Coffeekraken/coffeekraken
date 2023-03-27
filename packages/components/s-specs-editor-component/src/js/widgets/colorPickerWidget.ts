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
                <div class="${component.utils.cls('_color-picker')}">
                    <label
                        class="${component.utils.cls(
                            '_label',
                            's-label s-label--block',
                        )}"
                    >
                        <s-color-picker
                            value="${values.value ?? '#ff0000'}"
                            format="${values.format ?? 'hexa'}"
                            @s-color-picker.change=${(e) => {
                                component.setValue(path, {
                                    ...values,
                                    value: e.detail[values.format ?? 'hexa'],
                                });
                                component.apply();
                            }}
                        >
                            <input
                                type="text"
                                name="color"
                                class="s-input"
                                placeholder="Choose a color"
                            />
                            <div class="_color-preview"></div>
                        </s-color-picker>
                        ${component._renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
