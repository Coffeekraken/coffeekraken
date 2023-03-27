import { html } from 'lit';

import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';

__SSpacesSelectorComponentDefine();

export default function (component) {
    return {
        keepOriginals: false,
        html({ propObj, values, path }) {
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
                    class="${component.utils.cls('_spaces')}"
                    @s-spaces-selector.change=${(e) => {
                        const setPath = `${path.join('.')}`;
                        component.setValue(setPath, e.detail);
                        component.apply();
                    }}
                >
                    <s-spaces-selector
                        .spaces=${spaces}
                        .values=${Object.assign({}, values ?? {})}
                    ></s-spaces-selector>
                </div>
            `;
        },
        events: {},
    };
}
