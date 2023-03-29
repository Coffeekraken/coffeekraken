import { html } from 'lit';

export default function (component) {
    return {
        keepOriginals: false,
        isActive() {
            return true;
        },
        html({ propObj, values, path }) {
            if (!values) {
                values = {
                    value: propObj.default ?? false,
                };
            }

            return html`
                <div class="${component.utils.cls('_switch-widget')}">
                    <label class="${component.utils.cls('_label', 's-label')}">
                        <input
                            @change=${(e) => {
                                component.setValue(path, {
                                    value: e.target.checked,
                                });
                                component.apply();
                            }}
                            type="checkbox"
                            name="${path.at(-1)}"
                            class="${component.utils.cls(
                                '_switch',
                                's-switch',
                            )}"
                            path="${path.join('.')}"
                            ?checked=${values.value !== false &&
                            values.value !== null &&
                            values.value !== undefined}
                        />
                        ${component.renderLabel(propObj, path)}
                    </label>
                </div>
            `;
        },
    };
}
