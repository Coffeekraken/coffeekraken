import { html } from 'lit';

export default class SSpecsEditorComponentSwitchWidget {
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
        if (!values) {
            values = {
                value: propObj.default ?? false,
            };
        }

        return {
            error: this._error,
            warning: this._warning,
            html: html`
                <div class="${this._component.utils.cls('_switch-widget')}">
                    <label
                        class="${this._component.utils.cls(
                            '_label',
                            's-label',
                        )}"
                    >
                        <input
                            @change=${(e) => {
                                this._component.setValue(path, {
                                    value: e.target.checked,
                                });
                                this._component.apply();
                            }}
                            type="checkbox"
                            name="${path.at(-1)}"
                            class="${this._component.utils.cls(
                                '_switch',
                                's-switch',
                            )}"
                            path="${path.join('.')}"
                            ?checked=${values.value !== false &&
                            values.value !== null &&
                            values.value !== undefined}
                        />
                        ${this._component.renderLabel(propObj, path)}
                    </label>
                </div>
            `,
        };
    }
}
