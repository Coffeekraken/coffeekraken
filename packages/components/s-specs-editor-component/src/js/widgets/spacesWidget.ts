import { html } from 'lit';

import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';

__SSpacesSelectorComponentDefine();

export default class SSpecsEditorComponentSpacesWidget {
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
        const spaces = {
            padding: [],
            margin: [],
        };

        propObj.props.paddingTop.options.forEach((option) => {
            spaces.padding.push({
                ...option,
                default: option.value == propObj.props.paddingTop.default,
            });
        });
        propObj.props.marginTop.options.forEach((option) => {
            spaces.margin.push({
                ...option,
                default: option.value == propObj.props.marginTop.default,
            });
        });

        return html`
            <div
                class="${this._component.utils.cls('_spaces-widget')}"
                @s-spaces-selector.change=${(e) => {
                    const setPath = `${path.join('.')}`;
                    this._component.setValue(setPath, e.detail);
                    this._component.apply();
                }}
            >
                <s-spaces-selector
                    .spaces=${spaces}
                    .values=${Object.assign({}, values ?? {})}
                ></s-spaces-selector>
            </div>
        `;
    }
}
